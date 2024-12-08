const db = require("../db/index.js");

exports.getWishlist = async (req, res, next) => {
  const { user, wishlist } = req.params;
  try {
    const query = `
    SELECT p.*, w.name AS wishlist_name
    FROM wishlist w, place p , place_wishlist pw
    WHERE pw.wishlist_id=w.wishlist_id AND p.place_id=pw.place_id AND w.user_id=$1 AND w.wishlist_id=$2
    `;
    const response = await db.query(query, [user, wishlist]);
    res.status(200).json({
      status: "success",
      length: response.rowCount,
      data: response.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
