const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv").config({ path: __dirname + "\\.env" });
const stockRouter = require("./routes/stock");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");

const port = process.env.PORT;
const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_CLUSTERNAME}.yv27mt7.mongodb.net/${process.env.DB_DATABASENAME}?retryWrites=true&w=majority`;
mongoose.set("strictQuery", true);
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
//Cors Requirements
app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Expose-Headers", "* , authorization");
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("API WORKING PROPERLY");
});

app.use(`/stock`, stockRouter);
app.use(`/auth`, authRouter);

app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
