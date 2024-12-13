const db = require("../db/index.js");

exports.getWishlist = async (req, res, next) => {
  const { id } = req.params;
  try {
    const query = `
    SELECT p.*, w.name AS wishlist_name
    FROM wishlist w, place p, place_wishlist pw
    WHERE pw.wishlist_id=w.wishlist_id AND p.place_id=pw.place_id AND w.wishlist_id=$1
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
      message: err.message,
    });
  }
};

exports.createWishlist = async (req, res, next) => {
  try {
    await db.query("COMMIT");
    const { user_id, name, description } = req.body;
    const query = `
    INSERT INTO wishlist (name, user_id, date, description) VALUES($1, $2, CURRENT_DATE, $3) RETURNING *
    `;
    const response = await db.query(query, [name, user_id, description]);

    res.status(200).json({
      status: "success",
      length: response.rowCount,
      data: response.rows[0],
    });
  } catch (err) {
    await db.query("ROLLBACK");
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
