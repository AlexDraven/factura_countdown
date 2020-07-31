import mysql from 'mysql';
var pool = mysql.createPool({
  connectionLimit: 12,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectTimeout: 5000,
});
pool.getConnection(() => {
  console.log('[DB]: is on');
});
module.exports = pool;
