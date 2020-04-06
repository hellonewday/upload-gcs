// Start coding from here
const router = require("express").Router();
const fileController = require("../controllers/files");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/", fileController.showFiles);
router.post("/", upload.single("picture"), fileController.uploadFiles);

module.exports = router;
