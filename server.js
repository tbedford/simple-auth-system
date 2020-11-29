const express = require("express");
const app = express();
app.use(express.static("public"));

require("dotenv").config({
  path: __dirname + "/.env",
});

const pg = require("pg");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/login", (req, res) => {});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/views/register.html");
});

app.get("/protected", (req, res) => {

    res.sendFile(__dirname + "/views/protected.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
