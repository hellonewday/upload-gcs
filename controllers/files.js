const File = require("../model/File");
const { Storage } = require("@google-cloud/storage");

// Generate key file like this in:  IAM & Admin > Service Accounts
const storage = new Storage({
  projectId: "flowing-coil-269914", // Replace with your project-id
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
  const bucket = storage.bucket("my-warm-bucket"); // Replace with your bucket name
  const blob = bucket.file(req.file.originalname);

  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on("error", (err) => {
    next(err);
  });

  blobStream.on("finish", () => {
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    // Below code is optional 
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

    // End optional code. :)
  });

  blobStream.end(req.file.buffer);
};
