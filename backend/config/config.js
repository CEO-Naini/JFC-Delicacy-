const { Pool } = require('pg');
require('dotenv').config();



if (!process.env.DB_PASSWORD) {
    console.error("❌ ERROR: DB_PASSWORD is NOT set in the environment variables!");
} else if (typeof process.env.DB_PASSWORD !== "string") {
    console.error("❌ ERROR: DB_PASSWORD is not a string!");
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, // Ensure this is loaded correctly
  port: process.env.DB_PORT,
});

pool.connect()
  .then(client => {
    console.log("✅ Database connected successfully!");
    client.release();
  })
  .catch(err => {
    console.error("❌ Database connection error:", err);
  });

module.exports = pool;
