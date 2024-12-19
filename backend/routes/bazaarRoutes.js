const express = require("express");
const bazaarController = require("../controllers/bazaarController");
const authController = require("../controllers/authController");

const router = express.Router();

router.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  bazaarController.deleteGift
);
router.get("/", bazaarController.getAllGifts);
router.get("/points", authController.protect, bazaarController.getPoints);
router.post(
  "/addGift",
  authController.protect,
  authController.restrictTo("admin"),
  bazaarController.addGift
);

router.post("/buy", authController.protect, bazaarController.buyGift);
router.post(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  bazaarController.setActivity
);

router.put(
  "/:id/editGift",
  authController.protect,
  authController.restrictTo("admin"),
  bazaarController.editGift
);

module.exports = router;
