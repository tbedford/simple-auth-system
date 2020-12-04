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
  password VARCHAR(255),
  session_id VARCHAR(50)
);
```

You can also create the table from code -> see testdb.js for how to do this.

## TODO

- [x] Set an expiry on the cookie - this should be configurable. At the moment it's just default expiry (when the browser closes)
- [x] If the user logs out we should expire the cookie. Could probably avoid resetting the session_id field in the database as without the cookie there's nothing to compare to, and the session_id will be regenerated anyway when the user logs back in, but feel it probably should be cleared anyway!
- [ ] Need to fix HTTP error codes!
- [ ] Is there a way to set multiple paths for a cookie??

