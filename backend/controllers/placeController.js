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

// Get All Place Reviews Route Handler
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

// Get All Place Photos Route Handler
exports.getAllPhotos = async (req, res) => {
  try {
    const data = await db.query(
      `SELECT U.first_name, U.last_name, U.profile_pic, P.photo_id, P.photo, P.date, P.caption
    FROM visitor U, photo P
    WHERE P.user_id = U.user_id AND P.place_id = $1`,
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

// Post Review Route Handler
exports.postReview = async (req, res) => {
  try {
    req.user = 1; // to be deleted later
    console.log(req.body);
    console.log(req.params.id);
    const data = await db.query(
      `INSERT INTO review (rating, date, title, main_content, user_id, place_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        +req.body.rating,
        req.body.date,
        req.body.title,
        req.body.main_content,
        req.user,
        req.params.id,
      ]
    );
    console.log(data.rows[0]);
    res.status(200).json({
      status: "success",
      data: data.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      message: err,
    });
  }
};

exports.postPhoto = async (req, res) => {
  req.user = 8; // to be deleted later
  try {
    console.log(req.body);
    const data = await db.query(
      `INSERT INTO photo (photo, date, caption, user_id, place_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.body.photo, req.body.date, req.body.caption, req.user, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: data.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      message: err,
    });
  }
};
