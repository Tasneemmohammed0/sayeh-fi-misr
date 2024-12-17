const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");
const authController = require("../controllers/authController");

router.get(
  "/users",
  authController.protect,
  authController.restrictTo("admin"),
  statsController.getUsersTypes
);

module.exports = router;
