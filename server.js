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
});

// create table
function createTable(tablename) {
  pool.query(
    `CREATE TABLE IF NOT EXISTS ${tablename} (id serial primary key, username varchar(255), password varchar(255), session_id CHAR (40));`,
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(JSON.stringify(results.command));
    }
  );
}

createTable("users");

// register a user
function addUser(tablename, uname, pword) {
  pool.query(
    `INSERT INTO ${tablename} (username, password) VALUES ($1, $2)`,
    [uname, pword],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(JSON.stringify(results.rowCount));
    }
  );
}

// get specific user
function getUser(tablename, uname) {
  pool.query(
    `SELECT * FROM ${tablename} WHERE username = $1`,
    [uname],
    (error, results) => {
      if (error) {
        throw error;
      }
      return results.rows;
    }
  );
}

// get all users
function getAllUsers(tablename) {
  pool.query(`SELECT * FROM ${tablename} ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(JSON.stringify(results.rows));
  });
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/login", (req, res) => {
  console.log("/login");
  var result = getUser("users", req.body.username);
  console.log(`User password: ${result}`)
});

app.get("/register-form", (req, res) => {
  console.log("/register-form");
  res.sendFile(__dirname + "/views/register-form.html");
});

app.post("/register", (req, res) => {
  console.log(`/register => ${req.body.username} ${req.body.password}`);
  addUser("users", req.body.username, req.body.password);
});

app.get("/protected", (req, res) => {
  console.log("/protected");
  res.sendFile(__dirname + "/views/protected.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
