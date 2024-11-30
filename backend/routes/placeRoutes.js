const express = require("express");
const placeController = require("../controllers/placeController");
const authController = require("../controllers/authController");
const router = express.Router();

//Get all places request
router.get("/", placeController.getAllPlaces);
// Get one place request
router.get("/:id", placeController.getPlace);
// Get all reviews for a place
router.get("/:id/reviews", placeController.getPlaceReviews);
// Post a review for a place
router.post(
  "/:id/addReview",
  // authController.protect,
  placeController.postReview
);
module.exports = router;
