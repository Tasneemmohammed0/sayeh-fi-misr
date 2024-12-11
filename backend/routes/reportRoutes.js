const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");
const reportController = require("../controllers/reportController");

// All routes are restricted to only logged in users
router.use(authController.protect);

router.post("/add", reportController.addReport);

// Starting from here, routes are restricted to only admins
router.use(authController.restrictTo("admin"));
router.get("/", adminController.getReports);

// resolve report
router.delete("/:id", adminController.resolveReport);

module.exports = router;
