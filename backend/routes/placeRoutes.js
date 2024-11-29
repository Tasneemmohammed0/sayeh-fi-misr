const express = require("express");
const placeController = require("../controllers/placeController");
const router = express.Router();

//Get all places request
router.get("/", placeController.getAllPlaces);
// Get one place request
router.get("/:id", placeController.getPlace);
//console.log("placeRoutes.js");

module.exports = router;
