const express = require("express");
const photoController = require("../controllers/photoController.js");
const authController = require("../controllers/authController.js");

const router = express.Router();

// delete a photo
router.delete("/:id", authController.protect, photoController.deletePhoto);
// update a photo
router.patch("/:id", authController.protect, photoController.updatePhoto);

module.exports = router;
