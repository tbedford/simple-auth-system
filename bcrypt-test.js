const bcrypt = require("bcrypt");

const password = "password";

async function genHash(password) {
  const saltRounds = 10;
  var hash = await bcrypt.hash(password, saltRounds);
  console.log(hash);
}

genHash(password);
genHash(password);

const hash = "$2b$10$ITDfih6waUZXxJZHIt0p9.nCP62QIrQ893JjS2NIqmtGUCSA3f5c2";

async function checkPassword(p, h) {
  var r = await bcrypt.compare(p, h);
  console.log(r);
  return r;
}

async function main() {
  var result = await checkPassword(password, hash);
  console.log(result);
}

main();
