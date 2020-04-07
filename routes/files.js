const router = require("express").Router();
const fileController = require("../controllers/files");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.get("/", fileController.showFiles);
router.post("/", upload.single("picture"), fileController.uploadFiles);

module.exports = router;
