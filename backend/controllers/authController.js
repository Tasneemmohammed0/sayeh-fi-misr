require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      nationality: req.body.nationality,
      photo: req.body.photo,
      gender: req.body.gender,
      age: req.body.age,
      password: hashedPassword,
    };
    const token = jwt.sign(newUser, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token);

    // Add user to database here, then remove the password key/value from response output

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
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({
      status: "fail",
      message: "Not logged in",
    });
  }

  // 2) Token verification
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: token,
      });
    }
    req.body = user;
    next();
  }); // sets the user in request body

  // (TBA) Check if user still exists
  // (TBA) Check if user changed password after JWT was issued (tell him to login again)

  //   res.status(200).json({
  //     status: "success",
  //     data: {
  //       user: req.user,
  //     },
  //   });
};

exports.getMe = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      curr_user: req.body,
    },
  });
};
