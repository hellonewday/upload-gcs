const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "flowing-coil-269914",
  keyFilename: "./flowing-coil-269914-569572b276ae.json",
});

module.exports.uploadImage = async (bucketName, filename) => {
  return await storage.bucket(bucketName).upload(filename, {
    gzip: true,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });
};
