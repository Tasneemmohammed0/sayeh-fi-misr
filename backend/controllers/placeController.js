const db = require("../db/index.js");

// Get one Place RouteHandler
exports.getPlace = async (req, res) => {
  try {
    const data = await db.query(`SELECT * FROM place WHERE place_id =$1`, [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      place: data.rows,
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
      count: data.rows.length,
      places: data.rows,
    });
  } catch (err) {
    console.log(err);
  }
};
