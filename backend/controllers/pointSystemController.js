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

exports.removePoints = async (userId, type) => {
  try {
    await db.query(
      `WITH cte AS (
                SELECT ctid  
                FROM visitor_activity
                WHERE user_id = $1 AND type = $2
                LIMIT 1
            )
            DELETE FROM visitor_activity
            WHERE ctid IN (SELECT ctid FROM cte);
            `,
      [userId, type]
    );
  } catch (err) {
    console.error(err.message);
  }
};
