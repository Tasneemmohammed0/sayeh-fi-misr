require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/index");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const query = `
      SELECT *
      FROM visitor
      WHERE email = $1
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

    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token);

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
    if (!req.body.firstName)
      res.status(404).json({
        status: "fail",
        message:
          "Not enough data [firstName, lastName, username, role, email, nationality, photo, gender, age, password",
      });
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
    };
    const token = jwt.sign(newUser, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Add user to database here, then remove the password key/value from response output
    const query = `
      INSERT INTO visitor 
      (first_name, last_name, username, email, password, age, role, country, city, profile_pic, gender)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
    `;
    const params = [
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
    const result = await db.query(query, params);
    console.log(result);
    res.status(201).json({
      status: "success",
      token,
      data: {
        rows: result.rowCount,
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
        message: token,
      });
    }
    currentUser = user;
  }); // sets the user in request body

  // (TBA) 3) Check if user still exists

  // (TBA) 4) Check if user changed password after JWT was issued (tell him to login again)

  // 5) Grant access
  req.user = currentUser;
  next();
};
