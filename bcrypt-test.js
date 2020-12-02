const bcrypt = require("bcrypt");

async function genHash(password) {
  const saltRounds = 10;
  var hash = await bcrypt.hash(password, saltRounds);
  console.log(hash);
}

async function checkPassword(password, dbhash) {
  const saltRounds = 10;
  var hash = await bcrypt.hash(password, saltRounds);

  if (hash == dbhash) {
    console.log("Password matched");
  } else {
    console.log("Password did not match");
  }
}

//checkPassword("password", genHash("password"));

genHash("password")
genHash("password")
