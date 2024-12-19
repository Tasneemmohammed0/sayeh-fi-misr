const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");
const authController = require("../controllers/authController");

module.exports = router;

router.use(authController.protect, authController.restrictTo("admin"));

router.get("/users", statsController.getUsersTypes);

router.get("/gathering", statsController.getPopularGathering);

router.get("/ratings/:city", statsController.getAvgRatings);

// Top 5 nationalities
router.get("/nationalities", statsController.getTopFiveNationalities);

// Get place visits in the last 7 days
router.get("/place/:id", statsController.getPlaceVisits);
