const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");
const authController = require("../controllers/authController");

module.exports = router;

// Top 5 nationalities
router.get(
  "/nationalities",
  authController.protect,
  authController.restrictTo("admin"),
  statsController.getTopFiveNationalities
);
