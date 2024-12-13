const authController = require("./authController");
const db = require("../db/index");

exports.getMe = (req, res, next) => {
  req.params.id = req.user.user_id;
  next();
};

exports.getUser = async (req, res, next) => {
  if (req.params.id == "allusers") {
    return next();
  }
  try {
    const query = `
  SELECT * 
  FROM visitor
  WHERE user_id=$1
  `;
    const params = [+req.params.id];
    const response = await db.query(query, params);
    const user = response.rows[0];
    if (!user)
      return res
        .status(404)
        .json({ status: "fail", message: "user not found." });

    user.password = undefined;
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

// Get all reviews made by user_id
exports.getUserReviews = async (req, res, next) => {
  try {
    // query returns place photo, place name, review title, review rating, review date, review content
    const query = `
    SELECT P.photo, P.name, R.title, R.rating, R.date, R.main_content 
    FROM PLACE P, REVIEW R 
    WHERE R.place_id = P.place_id AND R.user_id = $1`;

    const params = [+req.params.id];
    const result = await db.query(query, params);

    res.status(200).json({
      status: "success",
      length: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get all photos posted by user_id
exports.getUserPhotos = async (req, res, next) => {
  try {
    const query = `SELECT DISTINCT Ph.photo_id, Ph.photo, Ph.date, Ph.caption, Ph.place_id, Pl.name AS place_name FROM photo Ph, place Pl
    WHERE Ph.user_id = $1 AND Ph.place_id = Pl.place_id`;

    const params = [+req.params.id];
    const result = await db.query(query, params);

    res.status(200).json({
      status: "success",
      length: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get all wishlists made by user_id
exports.getUserWishlists = async (req, res, next) => {
  try {
    const query = `
    SELECT wishlist_id, name, description, date
    FROM Wishlist
    WHERE user_id = $1
    `;
    const params = [+req.params.id];
    const result = await db.query(query, params);
    res.status(200).json({
      status: "success",
      length: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getUserVisitLists = async (req, res, next) => {
  try {
    const query = `
    SELECT P.name, P.photo, P.city, P.place_id
    FROM Place P, Visitor_place VP
    WHERE VP.place_id = P.place_id AND VP.user_id = $1
    `;
    const params = [+req.params.id];
    const result = await db.query(query, params);
    res.status(200).json({
      status: "success",
      length: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getUserGatheringLists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = `
    SELECT g.*, p.photo, p.name, p.city, p.location, h.first_name, h.last_name
    FROM gathering g, place p, host h
    WHERE g.place_id=p.place_id AND h.user_id=$1
    `;
    const response = await db.query(query, [id]);
    res.status(200).json({
      status: "success",
      length: response.rowCount,
      data: response.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUserBadges = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
       SELECT b.*,vb.* FROM
      visitor_badge vb,badge b
      WHERE vb.badge_name=b.name AND user_id=$1
    `;
    const response = await db.query(query, [id]);
    res.status(200).json({
      status: "success",
      length: response.rowCount,
      data: response.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// get user stats
exports.getUserStats = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const query = `
   SELECT 
    (SELECT COUNT(*) FROM visitor_place VP WHERE VP.user_id=$1) AS places_count,
    (SELECT COUNT(*) FROM review R WHERE R.user_id=$1) AS reviews_count, 
    (SELECT COUNT(*) FROM photo P WHERE P.user_id=$1) AS photos_count;`;

    const response = await db.query(query, [id]);
    console.log(response);
    res.status(200).json({
      status: "success",
      length: response.rowCount,
      data: response.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
