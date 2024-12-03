const authController = require("./authController");
const db = require("../db/index");

exports.getMe = (req, res, next) => {
  req.params.id = req.user.user_id;

  next();
};

exports.getUser = async (req, res, next) => {
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

// Get all wishlists made by user_id
exports.getUserWishlists = async (req, res, next) => {
  try {
    const query = `
    SELECT name, description, date
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
    SELECT P.name, P.photo, P.city
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
