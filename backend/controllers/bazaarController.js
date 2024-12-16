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

    //Points gained by activities
    const gainedPointsQuery = `
     
    SELECT SUM(points) as gained_points
    FROM visitor_activity
    where user_id=$1
    GROUP BY user_id
  `;
    const gainedPointsData = await db.query(gainedPointsQuery, [
      req.user.user_id,
    ]);
    const gainedPoints = +gainedPointsData.rows[0]?.gained_points || 0;
    //Points spent on gifts
    const spentPointsQuery = `
   SELECT SUM(  points) as spent_points
   FROM visitor_gift vg,gift g
   where user_id=$1 AND vg.product_code=g.product_code
   GROUP BY user_id

`;

    const spentPointsData = await db.query(spentPointsQuery, [
      req.user.user_id,
    ]);
    const spentPoints = +spentPointsData.rows[0]?.spent_points || 0;
    console.log(gainedPoints, spentPoints);
    // Handle delete some activities after purchase a gift
    const totalPoints =
      gainedPoints > spentPoints ? gainedPoints - spentPoints : 0;

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
