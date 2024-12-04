const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup); //http://localhost:1123/api/v1/users/signup
router.post("/login", authController.login);
router.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUser
);

router.get(
  "/admin",
  authController.protect,
  authController.restrictTo("admin"),
  (req, res, next) => res.status(200).json({ message: "authorized" })
);

// get current user wish lists
router.get(
  "/myWishlists",
  authController.protect,
  userController.getMe,
  userController.getUserWishlists
);

router.get("/:id", userController.getUser);
router.get("/reviews/:id", userController.getUserReviews);
router.get("/wishlists/:id", userController.getUserWishlists);
router.get("/visitlist/:id", userController.getUserVisitLists);

module.exports = router;
