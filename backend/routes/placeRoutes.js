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
// Get all photos of a place
router.get("/:id/photos", placeController.getAllPhotos);
// Post a review for a place
router.post(
  "/:id/addReview",
  authController.protect,
  placeController.postReview
);
router.post("/:id/addPhoto", authController.protect, placeController.postPhoto);

// Add to wishlist route
router.post("/:id/addToWishlist", placeController.addToWishList);
// Add to visit list route
router.post(
  "/:id/addToVisitedList",
  authController.protect,
  placeController.addToVisitedList
);
// check visited
router.get(
  "/:id/checkVisited",
  authController.protect,
  placeController.checkVisited
);

module.exports = router;
