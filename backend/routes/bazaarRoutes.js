const express = require("express");
const bazaarController = require("../controllers/bazaarController");
const router = express.Router();

router.get("/", bazaarController.getAllGifts);
module.exports = router;
