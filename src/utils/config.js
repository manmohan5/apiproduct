const { Pool } = require('pg');

const pool = Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'restapi',
  password: 'mca',
  port: 5432,
  connectionTimeoutMillis: 1000,
  idleTimeoutMillis: 1000
});
module.exports = pool;
