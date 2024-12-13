const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.getExplorePlaces);
router.get("/exploregatherings", homeController.getExploreGatherings);
router.get("/trendingsection", homeController.getTrendingPlaces);

module.exports = router;
