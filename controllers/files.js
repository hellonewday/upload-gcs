const File = require("../model/File");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "flowing-coil-269914",
  keyFilename: "./flowing-coil-269914-569572b276ae.json",
});

module.exports.showFiles = (req, res) => {
  File.find().exec((error, response) => {
    if (error) {
      res.status(400).json({ error });
    } else {
      res.status(200).json({ data: response });
    }
  });
};

module.exports.uploadFiles = (req, res, next) => {
  const bucket = storage.bucket("my-warm-bucket");
  const blob = bucket.file(req.file.originalname);

  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on("error", (err) => {
    next(err);
  });

  blobStream.on("finish", () => {
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    const input = new File({
      fileUrl,
      description: req.body.description,
    });

    input.save((error, response) => {
      if (error) {
        res.status(400).json({ success: false, error });
      } else {
        res.status(201).json({ success: true, response });
      }
    });
  });

  blobStream.end(req.file.buffer);
};
