const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");
const reportController = require("../controllers/reportController");

// router.use(authController.protect, authController.restrictTo("admin"));

router.get(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  adminController.getReports
);
// Add Report Route
router.post("/add", authController.protect, reportController.addReport);

module.exports = router;
