const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.get("/:user/:wishlist", wishlistController.getWishlist);

module.exports = router;
