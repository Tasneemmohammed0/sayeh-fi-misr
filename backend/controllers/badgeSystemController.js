const db = require("../db/index.js");

exports.assignBadge = async (
  userId,
  badgeName,
  relationName,
  threshold,
  insertDate
) => {
  try {
    // Check if the badge already exists for the visitor
    const checkBadgeQuery = await db.query(
      `SELECT 1
       FROM visitor_badge vb
       JOIN badge b ON vb.badge_name = b.name
       WHERE vb.user_id = $1 AND b.name = $2
       LIMIT 1`,
      [userId, badgeName]
    );

    if (!checkBadgeQuery.rows.length) {
      // Check if the visitor will take the badge
      const criteriaQuery = await db.query(
        `SELECT COUNT(*) AS currentCount
        FROM ${relationName} 
        WHERE user_id =$1`,
        [userId]
      );

      // Check if the he passed the threshold

      if (Number(criteriaQuery.rows[0].currentcount) >= threshold) {
        // Assign the badge

        try {
          const insertBadgeQuery = await db.query(
            `INSERT INTO visitor_badge (user_id, badge_name, date) VALUES ($1, $2, $3) RETURNING *`,
            [userId, badgeName, insertDate]
          );
          console.log("Badge assigned:");
        } catch (err) {
          console.error("Error inserting badge:", err.message);
        }
      }
    }
  } catch (err) {}
};
