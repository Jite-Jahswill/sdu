const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { uploadMultipleImages } = require("../controllers/uploadController");

// Allow max 5 images per upload
router.post("/upload-images", upload.array("images", 5), uploadMultipleImages);

module.exports = router;
