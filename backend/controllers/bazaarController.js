const db = require("../db/index.js");
exports.getAllGifts = async (req, res) => {
  try {
    const data = await db.query(`SELECT gift.*,p.name AS place_name
FROM gift
JOIN place p
ON p.place_id=gift.place_id`);
    res.status(200).json({
      status: "success",
      length: data.rows.length,
      data: data.rows,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPoints = async (req, res) => {
  try {
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
  gathering_points AS (
      SELECT user_id, COUNT(DISTINCT gathering_id) * 20 AS points
      FROM visitor_gathering
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
      COALESCE(place_points.points, 0)+
	    COALESCE(gathering_points.points, 0)-
      COALESCE(gift_points.points, 0) AS total_points


  FROM visitor



  LEFT JOIN review_points ON review_points.user_id = visitor.user_id
  LEFT JOIN photo_points ON photo_points.user_id = visitor.user_id
  LEFT JOIN place_points ON place_points.user_id = visitor.user_id
  LEFT JOIN gathering_points ON gathering_points.user_id = visitor.user_id
  LEFT JOIN gift_points ON gift_points.user_id = visitor.user_id


  WHERE visitor.user_id = $1;


  `;
    const pointsData = await db.query(pointsQuery, [req.user.user_id]);
    const totalPoints = pointsData.rows[0]?.total_points || 0;

    res.status(200).json({
      status: "success",
      totalPoints: totalPoints,
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

exports.setActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_available } = req.body;
    const query = `UPDATE Gift SET is_available=$2 WHERE product_code=$1 RETURNING *`;
    const response = await db.query(query, [id, is_available]);
    res.status(201).json({
      status: "success",
      length: response.rowCount,
      data: {
        gift: response.rows,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addGift = async (req, res) => {
  try {
    const addGiftQuery = `INSERT INTO gift(name,photo,points,description,place_id,is_available) VALUES($1,$2,$3,$4,$5,$6) RETURNING*`;

    const addGiftData = await db.query(addGiftQuery, [
      req.body.name,
      req.body.photo,
      req.body.points,
      req.body.description,
      req.body.place_id,
      req.body.is_available,
    ]);
    res.status(201).json({
      status: "success",
      length: addGiftData.rowCount,
      data: addGiftData.rows[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.editGift = async (req, res) => {
  try {
    const editGiftQuery = `UPDATE gift 
set name=$1,photo=$2,points=$3,description=$4,place_id=$5,is_available=$6
WHERE product_code =$7 RETURNING*`;

    const editGiftData = await db.query(editGiftQuery, [
      req.body.name,
      req.body.photo,
      req.body.points,
      req.body.description,
      req.body.place_id,
      req.body.is_available,
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      length: editGiftData.rowCount,
      data: editGiftData.rows[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteGift = async (req, res) => {
  try {
    await db.query("COMMIT");
    const deleteGiftQuery = `DELETE FROM gift 

WHERE product_code =$1 RETURNING*`;

    const deleteGiftData = await db.query(deleteGiftQuery, [req.params.id]);
    res.status(200).json({
      status: "success",
      length: deleteGiftData.rowCount,
      data: deleteGiftData.rows[0],
    });
  } catch (err) {
    await db.query("ROLLBACK");
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
