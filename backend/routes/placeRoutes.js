const express = require("express");
const placeController = require("../controllers/placeController");
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");
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
  // authController.protect,
  placeController.postReview
);
router.post(
  "/:id/addPhoto",
  // authController.protect,
  placeController.postPhoto
);

// Add to wishlist route
router.post(
  "/:id/addToWishlist",
  // authController.protect,
  placeController.addToWishList
);

// Starting from here, all coming endpoints are restricted admins only, be careful
router.use(authController.protect, authController.restrictTo("admin"));
router.delete("/:id", adminController.deletePlace);
router.post("/", adminController.createPlace);
module.exports = router;
