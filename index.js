require("dotenv").config();
require("./database/database.js").connect();
const express = require("express");
const favicon = require("express-favicon");
const router = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");

// This is for Educative.io containers only.
// Files are stored to disk
// Each run wipes up everything the user did
// So, we need to wipe up the file documents too.
const { File } = require("./models/file");
File.remove({}, () => {
  console.log("Cleaned the deleted files");
})

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(favicon("/app/build/favicon.ico"));
app.use(express.static("/app/build"));
app.use("/uploads", express.static("/app/backend/uploads"));

app.use("/", router);

app.get("/hello", (req, res) => {
  res.send("Hello 🙌 ");
});

app.get("/*", function (req, res) {
  res.sendFile("/app/build/index.html");
});

app.listen(port);
