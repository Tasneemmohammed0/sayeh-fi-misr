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

// delete a place from wishlist
exports.deleteFromWishList = async (req, res) => {
  try {
    await db.query("COMMIT");
    const data = await db.query(
      `DELETE FROM place_wishlist WHERE place_id=$1 AND wishlist_id=$2 RETURNING *`,
      [req.params.place_id, req.params.id]
    );

    if (!data.rowCount) {
      res.status(400).json({
        message: "Failed to delete",
      });
      return;
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
