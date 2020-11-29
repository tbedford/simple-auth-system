const express = require("express");
const app = express();
app.use(express.static("public"));

require("dotenv").config({
  path: __dirname + "/.env",
});

const pg = require("pg");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "testuser",
  host: "localhost",
  database: "testdb",
  password: process.env.PASSWORD,
  port: 5432,
});

// create table
const tablename = "users";

pool.query(
  `CREATE TABLE IF NOT EXISTS ${tablename} (id serial primary key, username varchar(255), password varchar(255), session_id CHAR (40));`,
  (error, results) => {
    if (error) {
      throw error;
    }
    console.log(JSON.stringify(results.command));
  }
);

// register a user
function addUser(uname, pword) {
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

function getUser() {
  pool.query("SELECT * FROM users WHERE id = $1", [1], (error, results) => {
    if (error) {
      throw error;
    }
    console.log(JSON.stringify(results.rows));
  });
}

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
