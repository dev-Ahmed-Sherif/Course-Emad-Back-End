const filesPayloadExists = (req, res, next) => {
  if (!req.files) {
    console.log("File error", "Missing files");
    return res.status(400).json({ status: "error", message: "Missing files" });
  }
  next();
};

module.exports = filesPayloadExists;
