# simple-auth-system

A simple authentication system based on Node/Express/Postgres.

Check you have Postgres rrunning:

``` shell
pg_ctl -D /usr/local/var/postgres status
```

Make sure you have the command line tool:

``` shell
psql --version
```

Set up a test DB:

``` shell
psql postgres
```

In `psql`:

``` psql
# \conninfo
# CREATE ROLE testuser WITH LOGIN PASSWORD 'password';
# ALTER ROLE testuser CREATEDB;
# \q
```

Log back in as test user:

``` shell
psql -d postgres -U testuser
```

And in `psql`:

``` psql
=> CREATE DATABASE testdb;
=> \c testdb
testdb =>
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);
```

You can also create the table from code -> see testdb.js for how to do this.

