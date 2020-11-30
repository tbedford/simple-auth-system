const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

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
    // create session ID and store in database for user
    var session_id = uuidv4();
    await pool.query("UPDATE users SET session_id = $1 WHERE username = $2", [
      session_id,
      req.body.username,
    ]);
    //console.log("Session ID => " + session_id)
    var cookie =
      "session_id=" + session_id + "; HttpOnly; samesite=strict; path=/debug"; // You can add Secure; property, but it won't work for local testing via HTTP, only HTTPS
    res.setHeader("set-cookie", [cookie]);
    res.sendFile(__dirname + "/views/protected.html");
  } else {
    console.log("Credentials not valid");
    res.status(403).send("Credentials failed");
  }
});

app.get("/register-form", (req, res) => {
  console.log("/register-form");
  res.sendFile(__dirname + "/views/register-form.html");
});

app.post("/register", async (req, res) => {
  console.log(`/register => ${req.body.username} ${req.body.password}`);
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    req.body.username,
    req.body.password,
  ]);
  res.sendFile(__dirname + "/views/index.html");
});

// Allow only if session_id is valid
app.get("/debug", async (req, res) => {
  console.log("/debug");
  var cookie = req.headers.cookie;
  var session_id = getCookie(cookie, "session_id");
  // look up username from session_id in database
  var results = await pool.query("SELECT username FROM users WHERE session_id = $1", [
    session_id,
  ]);
  var username = results.rows[0].username;
  console.log("username: ", username)
  if (username) {
    console.table(results.rows);
    res.status(200).send(username);
  } else {
    res.status(404).send("Session error");
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// Modified for server-side from code on W3Schools https://www.w3schools.com/js/js_cookies.asp
function getCookie(cookie, cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
