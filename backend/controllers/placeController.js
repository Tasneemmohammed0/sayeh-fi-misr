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

// Get Place Details RouteHandler
exports.getPlaceDetails = async (req, res) => {
  try {
    const placeId = req.params.id;

    const [placeData, reviewsData, photosData] = await Promise.all([
      db.query(`SELECT * FROM place WHERE place_id =$1`, [placeId]),
      db.query(
        `SELECT Distinct U.first_name, U.last_name, U.profile_pic, R.review_id, R.title, R.rating, R.date, R.main_content 
    FROM visitor U, review R 
    WHERE R.user_id = U.user_id AND place_id = $1`,
        [placeId]
      ),
      db.query(
        `SELECT Distinct U.first_name, U.last_name, U.profile_pic, P.photo_id, P.photo, P.date, P.caption
    FROM visitor U, photo P
    WHERE P.user_id = U.user_id AND P.place_id = $1`,
        [placeId]
      ),
    ]);

    console.log({
      place: placeData.rows[0],
      reviews: reviewsData.rows,
      photos: photosData.rows,
    });
    res.status(200).json({
      status: "success",
      data: {
        place: placeData.rows[0],
        reviews: reviewsData.rows,
        photos: photosData.rows,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err,
    });
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
    const data = await db.query(
      `SELECT Distinct U.first_name, U.last_name, U.profile_pic,  R.title, R.rating, R.date, R.main_content 
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
      `SELECT Distinct U.first_name, U.last_name, U.profile_pic, P.photo_id, P.photo, P.date, P.caption
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
  console.log(req.user);
  try {
    const data = await db.query(
      `INSERT INTO review (rating, date, title, main_content, user_id, place_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        +req.body.rating,
        req.body.date,
        req.body.title,
        req.body.main_content,
        req.user.user_id,
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

// Post photo route handler
exports.postPhoto = async (req, res) => {
  try {
    const data = await db.query(
      `INSERT INTO photo (photo, date, caption, user_id, place_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        req.body.photo,
        req.body.date,
        req.body.caption,
        req.user.user_id,
        req.params.id,
      ]
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

// Add to wish list
exports.addToWishList = async (req, res) => {
  try {
    const data = await db.query(
      `INSERT INTO place_wishlist (place_id, wishlist_id) VALUES ($1, $2)`,
      [req.params.id, req.body.wishlist_id]
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

// Add to visited list
exports.addToVisitedList = async (req, res) => {
  try {
    const data = await db.query(
      `INSERT INTO visitor_place (user_id, place_id, date) VALUES ($1, $2, $3)`,
      [req.user.user_id, req.params.id, req.body.date]
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

// check if place is visited
exports.checkVisited = async (req, res) => {
  try {
    const data = await db.query(
      `SELECT EXISTS (SELECT 1 FROM visitor_place WHERE user_id = $1 AND place_id = $2) AS is_visited`,
      [req.user.user_id, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: data.rows[0].is_visited,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err,
    });
  }
};
