const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/signup", authController.signup); //http://localhost:1123/api/v1/users/signup
router.post("/logout", authController.logout);
router.post("/login", authController.login);
router.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUser
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
router.get("/gatherings/:id", userController.getUserGatheringLists);
router.get("/badges/:id", userController.getUserBadges);
router.get("/photos/:id", userController.getUserPhotos);
router.get("/stats/:id", userController.getUserStats);

// Starting from here, all coming endpoints are for admins only, be careful
router.use(authController.protect, authController.restrictTo("admin"));

router.get("/allusers", adminController.getAll);
router.delete("/:id", adminController.deleteUser);
router.post("/createadmin/:id", adminController.createAdmin);

module.exports = router;
