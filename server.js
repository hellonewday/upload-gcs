// Import some dependencies here !
const express = require("express");
const mongoose = require("mongoose");

// Import routes.
const files = require("./routes/files");

const app = express();

// Let link all files in this directory with the server!
app.use("/", express.static(__dirname));

// Body - parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect mongoose - we will use files database
mongoose
  .connect("mongodb://localhost:27017/files", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to MongoDB!");
  });

// Routes
app.use("/api/uploads", files);

// Port Variable and listen on port
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}`));
