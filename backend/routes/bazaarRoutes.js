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
router.post(
  "/addGift",
  authController.protect,
  authController.restrictTo("admin"),
  bazaarController.addGift
);

router.put(
  "/:id/editGift",
  authController.protect,
  authController.restrictTo("admin"),
  bazaarController.editGift
);

router.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  bazaarController.deleteGift
);
module.exports = router;
