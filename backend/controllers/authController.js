require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.allUsers = [];

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = this.allUsers.find((u) => u.email === email);
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
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      role: req.body.role,
      email: req.body.email,
      nationality: req.body.nationality,
      photo: req.body.photo,
      gender: req.body.gender,
      age: req.body.age,
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
    this.allUsers.push(newUser);
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
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
