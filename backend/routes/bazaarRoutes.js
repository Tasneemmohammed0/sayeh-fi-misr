const express = require("express");
const bazaarController = require("../controllers/bazaarController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.protect, bazaarController.getAllGifts);
router.post("/", authController.protect, bazaarController.buyGift);

module.exports = router;
