const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
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
};
