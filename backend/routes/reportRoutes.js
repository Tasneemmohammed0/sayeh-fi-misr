const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");

router.use(authController.protect, authController.restrictTo("admin"));

router.get("/", adminController.getReports);

module.exports = router;
