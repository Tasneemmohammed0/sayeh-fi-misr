const express = require("express");
const reviewController = require("../controllers/reviewController");
const router = express.Router();

router.get("/:placeID", reviewController.getAllReviews); //http://localhost:1123/api/v1/reviews/:placeId

module.exports = router;
