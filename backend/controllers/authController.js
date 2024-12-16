require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/index");

const formatSQLDate = (timestamp) => {
  const date = new Date(timestamp);

  // Extract components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Combine components into SQL format
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Example usage:
const sqlDate = formatSQLDate(Date.now());
console.log(sqlDate); // Output: "YYYY-MM-DD HH:MM:SS"

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const query = `
      SELECT *
      FROM visitor
      WHERE email ILIKE $1
    `;
    const params = [email];
    let user = await db.query(query, params);
    user = user.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: "fail",
        message: "wrong email or password",
      });
    }

    user.password = undefined; //prevent hashed password from showing in the result

    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      status: "success",
      token,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      role: req.body.role,
      email: req.body.email,
      photo: req.body.photo,
      gender: req.body.gender,
      age: +req.body.age,
      country: req.body.country,
      city: req.body.city,
      password: hashedPassword,
      nationalities: req.body.nationalities,
    };
    const {
      firstName,
      lastName,
      username,
      role,
      email,
      gender,
      age,
      country,
      city,
      password,
      nationalities,
    } = newUser;
    if (
      !firstName ||
      !lastName ||
      !username ||
      !role ||
      !email ||
      !gender ||
      !age ||
      !country ||
      !city ||
      !password ||
      nationalities.length === 0
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Missing information",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        status: "fail",
        message: "password is too short",
      });
    }
    if (age <= 0)
      return res.status(400).json({
        status: "fail",
        message: "Age must be positive",
      });
    // Add user to database and return it
    const insertUserQuery = `
      INSERT INTO visitor 
      (first_name, last_name, username, email, password, age, role, country, city, profile_pic, gender)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;
    const userParams = [
      newUser.firstName,
      newUser.lastName,
      newUser.username,
      newUser.email,
      newUser.password,
      newUser.age,
      newUser.role,
      newUser.country,
      newUser.city,
      newUser.photo,
      newUser.gender,
    ];
    let result;
    result = await db.query(insertUserQuery, userParams);
    // contains the new user
    if (newUser.role === "host") {
      userParams.push(
        req.body.phone,
        req.body.background,
        result.rows[0].user_id
      );
      const q = `
      INSERT INTO host 
      (first_name, last_name, username, email, password, age, role, country, city, profile_pic, gender, phone_number, background, user_id)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `;
      result = await db.query(q, userParams);
    }
    const user = result.rows[0];

    let insertNationalityQuery;
    newUser.nationalities.forEach(async (nationality) => {
      insertNationalityQuery = `
        INSERT INTO visitor_nationality
        VALUES($1, $2)
      `;
      await db.query(insertNationalityQuery, [user.user_id, nationality]);
    });
    await db.query("COMMIT");
    user.password = undefined; // prevent hashed password from showing in the result
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // set response cookies to be the token
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(201).json({
      status: "success",
      token,
      rows: result.rowCount,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.protect = (req, res, next) => {
  // 1) Get token and check if it exists
  const token = req.cookies.jwt;
  if (token == null) {
    return res.status(401).json({
      status: "fail",
      message: "Not logged in",
    });
  }

  // 2) Token verification
  let currentUser;
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "unverified token",
        token,
      });
    }
    currentUser = user;
  }); // sets the user in request body

  // 3) Check if user still exists
  const query = `
  SELECT DISTINCT user_id FROM visitor WHERE user_id=$1
  `;
  const result = db.query(query, [currentUser.user_id]);
  console.log("ROWCOUNT:", result.rowCount);
  if (!result.rowCount || result.rowCount === 0) {
    res.clearCookie("jwt");
    return res.status(400).json({
      status: "fail",
      message: "User no longer exists, please login again",
    });
  }

  // 5) Grant access
  req.user = currentUser;
  next();
};

exports.restrictTo = (...roles) =>
  function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        status: "fail",
        message: "Insufficient Permissions",
      });
    }
    next();
  };
exports.logout = (req, res, next) => {
  res.clearCookie("jwt");
  req.user = undefined;
  return res.status(201).json({ message: "Success" });
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res.status(401).json({
        status: "fail",
        message: "Passwords don't match",
      });
    }
    let curUser = await db.query(
      "SELECT DISTINCT * from visitor WHERE user_id=$1",
      [req.user.user_id]
    );
    curUser = curUser.rows[0];
    if (
      !curUser ||
      !(await bcrypt.compare(currentPassword, curUser.password))
    ) {
      return res.status(400).json({
        status: "fail",
        message: "wrong password",
      });
    }
    const newHashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    const updatePassword = `
    UPDATE visitor SET password=$1 WHERE user_id=$2
    RETURNING *
    `;
    const response = await db.query(updatePassword, [
      newHashedPassword,
      req.user.user_id,
    ]);
    if (response.rows[0].password) response.rows[0].password = undefined; // to not send it
    res.status(201).json({
      status: "success",
      data: response.rows[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "failed to update password",
    });
  }
};
