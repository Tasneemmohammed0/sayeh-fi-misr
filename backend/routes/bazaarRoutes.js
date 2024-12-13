const express = require("express");
const bazaarController = require("../controllers/bazaarController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", bazaarController.getAllGifts);
router.get("/points", authController.protect, bazaarController.getPoints);

router.post("/", authController.protect, bazaarController.buyGift);
router.post(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  bazaarController.setActivity
);

module.exports = router;
