const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/blogRoutes");
// const blogRoutes = require("./blogRoute");

require("dotenv").config();

const app = express();
const port = process.env.PORT;
const dbUri = process.env.MONGODB_URI;

mongoose.connect(dbUri, {
  dbName: process.env.DB_NAME,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
