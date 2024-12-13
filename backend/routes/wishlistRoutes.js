const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const authController = require("../controllers/authController");

router.get("/:id", wishlistController.getWishlist);

router.post("/", authController.protect, wishlistController.createWishlist);

router.patch("/:id", authController.protect, wishlistController.updateWishlist);

module.exports = router;
