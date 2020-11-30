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
async function getUser(tablename, uname) {
  var rows = await pool.query(
    `SELECT * FROM ${tablename} WHERE username = $1`,
    [uname],
    (error, results) => {
      if (error) {
        throw error;
      }
      //console.log(results)
      return results.rows;
    }
  );
  return rows;
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

//createTable("users");
//addUser("users", "fredbloggs", "secret1");
//addUser("users", "jimsmith", "secret2");

//getAllUsers("users")

function main(){
  var res = getUser("users", "jimsmith");
  console.log(res)  
}

main();