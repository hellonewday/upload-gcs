const File = require("../model/File");
const { uploadImage } = require("../functions/fileUpload");

module.exports.showFiles = (req, res) => {
  File.find().exec((error, response) => {
    if (error) {
      res.status(400).json({ error });
    } else {
      res.status(200).json({ data: response });
    }
  });
};

module.exports.uploadFiles = (req, res) => {
  // Apply Google Cloud Storage.
  uploadImage("my-warm-bucket", req.file.path)
    .then((response) => {
      //  res.status(201).json({
      //    success: true,
      //    url: `https://storage.cloud.google.com/my-warm-bucket/${response[0].metadata.name}`,
      //  });

      let output = new File({
        fileUrl: `https://storage.cloud.google.com/my-warm-bucket/${response[0].metadata.name}`,
        description: req.body.description,
      });
      output.save((err, doc) => {
        if (err) {
          res.status(404).json({ error: err });
        } else {
          res.status(201).json({ success: true, data: doc });
        }
      });
    })
    .catch((error) => {
      res.status(400).json({ success: false, error });
    });
};
