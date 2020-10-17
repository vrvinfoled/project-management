const pg = require("pg");

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "db_sample", 
  password: "root",
  port: "5432"
});

// const pool = new pg.Client({
//   connectionString: process.env["DATABASE_URL"]
//   // connectionString: "postgres://postgres:root@localhost:5000/db_sample"
// });

module.exports = pool;