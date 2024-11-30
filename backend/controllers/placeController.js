const db = require("../db/index.js");

// Get one Place RouteHandler
exports.getPlace = async (req, res) => {
  try {
    const data = await db.query(`SELECT * FROM place WHERE place_id =$1`, [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      data: data.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
};

//Get All Places RouteHandler
exports.getAllPlaces = async (req, res) => {
  try {
    const data = await db.query(`SELECT * FROM place`);

    res.status(200).json({
      status: "success",
      length: data.rows.length,
      data: data.rows,
    });
  } catch (err) {
    console.log(err);
  }
};

// Get All Place Reviews
exports.getPlaceReviews = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await db.query(
      `SELECT U.first_name, U.last_name, U.profile_pic,  R.title, R.rating, R.date, R.main_content 
    FROM visitor U, review R 
    WHERE R.user_id = U.user_id AND place_id = $1`,
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      legnth: data.rows.length,
      data: data.rows,
    });
  } catch (err) {
    console.error(err);
  }
};
