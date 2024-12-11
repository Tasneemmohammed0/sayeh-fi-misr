const db = require("../db/index.js");
exports.getAllGifts = async (req, res) => {
  try {
    const data = await db.query(`SELECT gift.*,p.name AS place_name
FROM gift
JOIN place p
ON p.place_id=gift.place_id`);

    // Calculate Points Logic
    const pointsQuery = `WITH review_points AS (
    SELECT user_id, COUNT(DISTINCT review_id) * 20 AS points
    FROM review
    GROUP BY user_id
),
photo_points AS (
    SELECT user_id, COUNT(DISTINCT photo_id) * 15 AS points
    FROM photo
    GROUP BY user_id
),
place_points AS (
    SELECT user_id, COUNT(DISTINCT place_id) * 10 AS points
    FROM visitor_place
    GROUP BY user_id
),
gift_points AS (
    SELECT visitor_gift.user_id, COALESCE(SUM(gift.points), 0) AS points
    FROM visitor_gift
    JOIN gift ON gift.product_code = visitor_gift.product_code
    GROUP BY visitor_gift.user_id
)
SELECT 
    
    COALESCE(review_points.points, 0) +
    COALESCE(photo_points.points, 0) +
    COALESCE(place_points.points, 0) -
    COALESCE(gift_points.points, 0) AS total_points
FROM visitor
LEFT JOIN review_points ON review_points.user_id = visitor.user_id
LEFT JOIN photo_points ON photo_points.user_id = visitor.user_id
LEFT JOIN place_points ON place_points.user_id = visitor.user_id
LEFT JOIN gift_points ON gift_points.user_id = visitor.user_id
WHERE visitor.user_id = $1;

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

exports.buyGift = async (req, res) => {
  try {
    const buyQuery = `INSERT INTO visitor_gift (user_id,product_code,date) VALUES($1,$2,$3) RETURNING*`;

    const data = await db.query(buyQuery, [
      req.user.user_id,
      req.body.product_code,
      req.body.date,
    ]);
    res.status(200).json({
      status: "success",
      data: data.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
};
