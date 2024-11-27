const express = require("express");
const placeController = require("../controllers/placeController");
const router = express.Router();

router.get("/:placeID", placeController.getPlace);
console.log("placeRoutes.js");

module.exports = router;
