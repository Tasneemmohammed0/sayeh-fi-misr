const db = require("../db/index.js");
exports.getAllGifts = async (req, res) => {
  try {
    const data = await db.query(`SELECT gift.*,p.name AS place_name
FROM gift
JOIN place p
ON p.place_id=gift.place_id`);

    // Calculate Points Logic
    const pointsQuery = `SELECT 
    (COUNT(DISTINCT review.review_id) * 20 +
     COUNT(DISTINCT photo.photo_id) * 15 +
     COUNT(DISTINCT visitor_place.place_id) * 10
    ) - (SUM (DISTINCT gift.points)) AS total_points
FROM visitor
LEFT JOIN review ON review.user_id = visitor.user_id
LEFT JOIN photo ON photo.user_id = visitor.user_id
LEFT JOIN visitor_place ON visitor_place.user_id = visitor.user_id
LEFT JOIN visitor_gift ON visitor_gift.user_id = visitor.user_id
LEFT JOIN gift ON gift.product_code = visitor_gift.product_code
WHERE visitor.user_id = $1
GROUP BY visitor.user_id;


`;
    const pointsData = await db.query(pointsQuery, [req.user.user_id]);
    const totalPoints = pointsData.rows[0]?.total_points || 0;

    res.status(200).json({
      status: "success",
      length: data.rows.length,
      totalPoints: totalPoints,
      data: data.rows,
    });
  } catch (err) {
    console.log(err);
  }
};
