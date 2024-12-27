const db = require("../db/index.js");

exports.addPoints = async (userId, type, points) => {
  try {
    await db.query(
      `INSERT INTO visitor_activity (user_id,type,points) VALUES ($1,$2,$3)`,
      [userId, type, points]
    );
  } catch (err) {
    console.error(err.message);
  }
};
