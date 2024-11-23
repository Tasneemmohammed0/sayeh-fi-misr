const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup); //http://localhost:1123/api/v1/users/signup
router.get("/me", authController.protect, authController.getMe);
module.exports = router;
