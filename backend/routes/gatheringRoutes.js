const gatheringController = require("../controllers/gatheringController.js");
const express = require("express");

const router = express.Router();
//Get all gatherings

router.get("/", gatheringController.getAllGatherings);

//Get one gathering
router.get("/:id", gatheringController.getGathering);
router.delete("/:id", gatheringController.deleteGathering);
module.exports = router;
