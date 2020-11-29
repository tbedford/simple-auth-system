const pg = require("pg");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "testuser",
  host: "localhost",
  database: "testdb",
  password: "password",
  port: 5432,
});

// create table
const tablename = "anothertable"
pool.query(
  `CREATE TABLE IF NOT EXISTS ${tablename} (id serial primary key, username varchar(255), password varchar(255));`,
  (error, results) => {
    if (error) {
      throw error;
    }
    console.log(JSON.stringify(results.command));
  }
);

// add a user
function addUser(uname, pword) {
  pool.query(
    "INSERT INTO funkytable (username, password) VALUES ($1, $2)",
    [uname, pword],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(JSON.stringify(results.rowCount));
    }
  );
}

//addUser("tony", "secretWord")

// get all users
pool.query("SELECT * FROM funkytable ORDER BY id ASC", (error, results) => {
  if (error) {
    throw error;
  }
  console.log(JSON.stringify(results.rows));
});

// get specific user
pool.query("SELECT * FROM users WHERE id = $1", [1], (error, results) => {
  if (error) {
    throw error;
  }
  console.log(JSON.stringify(results.rows));
});
