const gatheringController = require("../controllers/gatheringController.js");
const authController = require("../controllers/authController.js");
const express = require("express");

const router = express.Router();

//Get all gatherings
router.get("/", gatheringController.getAllGatherings);

//Get one gathering
router.get("/:id", gatheringController.getGatheringDetails);
//router.get("/:id", gatheringController.getGathering);
router.get(
  "/:id/checkJoined",
  authController.protect,
  gatheringController.checkJoined
);

router.delete("/:id", gatheringController.deleteGathering);
router.put("/:id", gatheringController.updateGathering);
router.post("/", gatheringController.createGathering);

router.post(
  "/:id/join",
  authController.protect,
  gatheringController.joinGathering
);

router.post(
  "/:id/addToGathering",
  authController.protect,
  authController.restrictTo("host", "admin"),
  gatheringController.addToGathering
);
// leave gathering
router.delete(
  "/:id/leave",
  authController.protect,
  gatheringController.leaveGathering
);

router.delete(
  "/:id/:user_id",
  authController.protect,
  authController.restrictTo("host", "admin"),
  gatheringController.deleteFromGathering
);

router.get(
  "/:id/checkJoined",
  authController.protect,
  gatheringController.checkJoined
);
module.exports = router;
