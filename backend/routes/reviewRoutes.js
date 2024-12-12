const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

// delete a review
router.delete("/:id", authController.protect, reviewController.deleteReview);

// update a review
router.patch("/:id", authController.protect, reviewController.updateReview);

module.exports = router;
