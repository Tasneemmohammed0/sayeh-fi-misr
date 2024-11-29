// require("dotenv").config();
// const { Pool } = require("pg");

// const dbConfig = {
//   // user: process.env.DB_USER,
//   // password: process.env.DB_PASSWORD,
//   // host: process.env.DB_HOST,
//   // port: process.env.DB_PORT,
//   // database: process.env.DB_NAME,
//   // ssl: true
// };

// // const db = new Pool(dbConfig);
// const db = new Pool();
// db.connect(() => console.log("DB Running"));

// exports.ExecuteNonQuery = async (query, params = []) => {
//   try {
//     const res = await db.query(query, params);
//     return res;
//   } catch (err) {
//     console.log(err.message);
//     throw err;
//   }
// };

// exports.ExecuteQuery = async (query, params = []) => {
//   try {
//     const res = await db.query(query, params);
//     return res.rows; // return array
//   } catch (err) {
//     console.log(err.message);
//     throw err;
//   }
// };

// exports.ExecuteScalar = async (query, params = []) => {
//   try {
//     const res = await db.query(query, params);
//     if (res.rows.length > 0) return res.rows[0];

//     return null;
//   } catch (err) {
//     console.log(err.message);
//     throw err;
//   }
// };

// exports.close = async () => db.end();
