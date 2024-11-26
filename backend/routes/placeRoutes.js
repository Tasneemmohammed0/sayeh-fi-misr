const express = require("express");
const placeController = require("../controllers/placeController");
const router = express.Router();

router.use("/:placeID");
