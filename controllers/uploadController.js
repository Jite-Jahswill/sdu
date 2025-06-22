exports.uploadMultipleImages = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  // Map files to URLs
  const imageUrls = req.files.map(
    (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
  );

  res.status(201).json({
    message: "Images uploaded successfully",
    imageUrls,
  });
};
