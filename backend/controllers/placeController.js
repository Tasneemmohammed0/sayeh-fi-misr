const db = require("../db/index.js");
const {
  assignBadge,
  deleteBadge,
} = require("../controllers/badgeSystemController.js");
const { addPoints } = require("../controllers/pointSystemController.js");
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
    const data = await db.query(`SELECT p.*, AVG(r.rating) AS rate
FROM place p
LEFT JOIN review r ON p.place_id = r.place_id
GROUP BY p.place_id
ORDER BY p.place_id ASC

`);

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

    //Add this review to user's activities

    try {
      await addPoints(req.user.user_id, "review", 20);
    } catch (err) {
      console.error(err.message);
    }
    //Badge system
    try {
      await assignBadge(
        req.user.user_id,
        "Top Reviewer",
        "review",
        5,
        req.body.date
      );
    } catch (err) {
      console.error(err.message);
    }

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
    // Add this photo to users's activities
    try {
      await addPoints(req.user.user_id, "photo", 10);
    } catch (err) {
      console.error(err.message);
    }
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

    // Add this visit to user's activities
    try {
      await addPoints(req.user.user_id, "visit", 20);
    } catch (err) {
      console.error(err.message);
    }
    //badge system
    try {
      await assignBadge(
        req.user.user_id,
        "Top Visitor",
        "visitor_place",
        5,
        req.body.date
      );
    } catch (err) {
      console.error(err.message);
    }
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

// delete a place from visited list
exports.deleteFromVisitedList = async (req, res) => {
  try {
    await db.query("COMMIT");
    const data = await db.query(
      `DELETE FROM visitor_place WHERE user_id=$1 AND place_id=$2 RETURNING *`,
      [req.user.user_id, req.params.id]
    );

    if (!data.rowCount) {
      res.status(400).json({
        message: "Failed to delete",
      });
      return;
    }
    try {
      await deleteBadge(req.user.user_id, "Top Visitor", "visitor_place", 5);
    } catch (err) {
      console.error(err.message);
    }
    res.status(200).json({
      status: "success",
      length: data.rowCount,
      data: data.rows[0],
    });
  } catch (err) {
    await db.query("ROLLBACK");
    console.log(err);
    res.status(404).json({
      message: err,
    });
  }
};
