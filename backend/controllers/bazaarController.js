const db = require("../db/index.js");
exports.getAllGifts = async (req, res) => {
  try {
    const data = await db.query(`SELECT gift.*,p.name AS place_name
    FROM gift
    JOIN place p
    ON p.place_id=gift.place_id`);

    if (!data.rowCount) {
      return res.status(404).json({
        status: "fail",
        message: "No gifts available",
      });
    }
    res.status(200).json({
      status: "success",
      length: data.rows.length,
      data: data.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
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
    req.status(400).json({
      status: "fail",
      message: err.message,
    });
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
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
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
    const placeQuery = "SELECT place_id FROM place WHERE name = $1";
    const placeResult = await db.query(placeQuery, [req.body.place_name]);

    const place_id = placeResult.rows[0].place_id;
    console.log(place_id);

    const { name, photo, points, description, is_available } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      !name.trim() ||
      !/^[a-zA-Z\s]+$/.test(name.trim())
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Name must be a string.",
      });
    }

    if (name.length > 50) {
      return res.status(400).json({
        status: "fail",
        message: "Name must be a string with a maximum of 50 characters.",
      });
    }

    if (typeof points !== "number" || points < 0) {
      return res.status(400).json({
        status: "fail",
        message: "Points must be a non-negative number.",
      });
    }

    if (description.length > 500) {
      return res.status(400).json({
        status: "fail",
        message:
          "Description must be a string with a maximum of 500 characters.",
      });
    }

    const addGiftQuery = `INSERT INTO gift(name,photo,points,description,place_id,is_available) VALUES($1,$2,$3,$4,$5,$6) RETURNING*`;

    const addGiftData = await db.query(addGiftQuery, [
      req.body.name,
      req.body.photo,
      req.body.points,
      req.body.description,
      place_id,
      req.body.is_available,
    ]);
    res.status(201).json({
      status: "success",
      length: addGiftData.rowCount,
      data: { ...addGiftData.rows[0], place_name: req.body.place_name },
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
    const placeQuery = "SELECT place_id FROM place WHERE name = $1";
    const placeResult = await db.query(placeQuery, [req.body.place]);

    const place_id = placeResult.rows[0].place_id;
    const editGiftQuery = `UPDATE gift 
    set name=$1, points=$2, description=$3, place_id=$4
    WHERE product_code =$5 RETURNING*`;

    const editGiftData = await db.query(editGiftQuery, [
      req.body.name,
      req.body.points,
      req.body.description,
      place_id,
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
