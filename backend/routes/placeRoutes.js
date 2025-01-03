const express = require("express");
const placeController = require("../controllers/placeController");
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");
const router = express.Router();

//Get all places request
router.get("/", placeController.getAllPlaces);
// Get one place request
router.get("/:id", placeController.getPlaceDetails);

// Post a review for the place
router.post(
  "/:id/addReview",
  authController.protect,
  placeController.postReview
);
// Post a photo for the place
router.post("/:id/addPhoto", authController.protect, placeController.postPhoto);
// Add to wishlist route
router.post(
  "/:id/addToWishlist",
  authController.protect,
  placeController.addToWishList
);
// Add to visit list route
router.post(
  "/:id/addToVisitedList",
  authController.protect,
  placeController.addToVisitedList
);
// Delete from visited list
router.delete(
  "/:id/deleteFromVisitedList",
  authController.protect,
  placeController.deleteFromVisitedList
);
// check visited
router.get(
  "/:id/checkVisited",
  authController.protect,
  placeController.checkVisited
);

// Starting from here, all coming endpoints are restricted admins only, be careful
router.use(authController.protect, authController.restrictTo("admin"));
router.delete("/:id", adminController.deletePlace);
router.post("/", adminController.createPlace);
router.patch("/", adminController.updatePlace);

module.exports = router;
