const db = require("../db/index.js");

checkBadgeExistence = async (userId, badgeName) => {
  try {
    // Check if the badge already exists for the visitor
    const checkBadgeExistence = await db.query(
      `SELECT 1
       FROM visitor_badge vb
       JOIN badge b ON vb.badge_name = b.name
       WHERE vb.user_id = $1 AND b.name = $2
       LIMIT 1`,
      [userId, badgeName]
    );
    return checkBadgeExistence.rows.length > 0;
  } catch (err) {
    console.error(err.message);
  }
};
checkCriteria = async (userId, relationName) => {
  try {
    const criteriaQuery = await db.query(
      `SELECT COUNT(*) AS currentCount
        FROM ${relationName} 
        WHERE user_id =$1`,
      [userId]
    );
    return +criteriaQuery.rows[0].currentcount;
  } catch (err) {
    console.error(err.message);
  }
};
exports.assignBadge = async (
  userId,
  badgeName,
  relationName,
  threshold,
  insertDate
) => {
  // Check if the he passed the threshold

  const badgeExist = await checkBadgeExistence(userId, badgeName);
  if (!badgeExist) {
    const criteriaCount = await checkCriteria(userId, relationName);
    if (criteriaCount >= threshold) {
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
};

exports.deleteBadge = async (userId, badgeName, relationName, threshold) => {
  // Check if the he passed the threshold

  const badgeExist = await checkBadgeExistence(userId, badgeName);
  console.log(badgeExist, "===========");
  if (badgeExist) {
    const criteriaCount = await checkCriteria(userId, relationName);
    if (criteriaCount < threshold) {
      // Assign the badge

      try {
        const deleteBadgeQuery = await db.query(
          `DELETE FROM visitor_badge WHERE user_id=$1 AND badge_name =$2 RETURNING *`,
          [userId, badgeName]
        );
        console.log("Badge deleted:");
      } catch (err) {
        console.error("Error deleting badge:", err.message);
      }
    }
  }
};
