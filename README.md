# simple-auth-system

A simple authentication system based on Node/Express/Postgres

``` shell
pg_ctl -D /usr/local/var/postgres status
```

``` shell
$psql postgres
# \conninfo
# CREATE ROLE testuser WITH LOGIN PASSWORD 'password';
# ALTER ROLE testuser CREATEDB;
$psql -d postgres -U testuser
=> CREATE DATABASE testdb;
=> \c testdb
testdb =>
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);
```
