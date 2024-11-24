const authController = require("./authController");

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = (req, res, next) => {
  const user = authController.allUsers.find((u) => u.id == +req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
