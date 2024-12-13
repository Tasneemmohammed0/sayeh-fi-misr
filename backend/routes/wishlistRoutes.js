const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const authController = require("../controllers/authController");

router.get("/:id", wishlistController.getWishlist);
router.delete(
  "/:id",
  authController.protect,
  wishlistController.deleteWishlist
);
router.post("/", authController.protect, wishlistController.createWishlist);

module.exports = router;
