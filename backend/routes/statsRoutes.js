const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");
const authController = require("../controllers/authController");

module.exports = router;

router.use(authController.protect, authController.restrictTo("admin"));

router.get("/users", statsController.getUsersTypes);

router.get("/gathering", statsController.getPopularGathering);
// Top 5 nationalities
router.get("/nationalities", statsController.getTopFiveNationalities);
