const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config({
  path: __dirname + "/.env",
});

const pg = require("pg");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "testuser",
  host: "localhost",
  database: "userdb",
  password: process.env.PASSWORD,
  port: 5432,
  max: 10,
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/login", async (req, res) => {
  console.log(`/login => get user: ${req.body.username}`);
  var results = await pool.query("SELECT * FROM users WHERE username = $1", [
    req.body.username,
  ]);
  var pword = results.rows[0].password;
  if (pword == req.body.password) {
    console.log("Authenticated credentials");
    res.sendFile(__dirname + "/views/protected.html");
  } else {
    console.log("Credentials not valid");
  }
});

app.get("/register-form", (req, res) => {
  console.log("/register-form");
  res.sendFile(__dirname + "/views/register-form.html");
});

app.post("/register", async (req, res) => {
  console.log(`/register => ${req.body.username} ${req.body.password}`);
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)",[req.body.username, req.body.password]);
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/debug", async (req, res) => {
  console.log("/debug");
  var results = await pool.query("SELECT * FROM users ORDER BY id ASC");
  console.table(results.rows);
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
