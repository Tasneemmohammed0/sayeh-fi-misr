const { Pool } = require("pg");
const pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = { query: (text, params) => pool.query(text, params) };
