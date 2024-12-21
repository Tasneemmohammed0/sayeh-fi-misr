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

    if (!response.rowCount) {
      return res.status(404).json({
        status: "fail",
        message: "Wishlist doesn't exist",
      });
    }

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
    // Validate name to not be a number
    if (name && +name) {
      return res.status(400).json({
        status: "fail",
        message: "Name can't be a number",
      });
    }
    // Check if empty name or whitespace
    if (!name.trim())
      return res.status(400).json({
        status: "fai",
        message: "Name can't be empty",
      });

    // Validate description to not be a number
    if (description && +description) {
      return res.status(400).json({
        status: "fail",
        message: "Description can't be a number",
      });
    }
    if (!description.trim())
      return res.status(400).json({
        status: "fai",
        message: "Description can't be empty",
      });

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
    let message = err.message;
    if (err.message.includes("unique"))
      message = "You already have a wishlsit with this name";
    res.status(400).json({
      status: "fail",
      message,
    });
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validate name to not be a number
    if (name && +name) {
      return res.status(400).json({
        status: "fail",
        message: "Name can't be a number",
      });
    }

    // Validate description to not be a number
    if (description && +description) {
      return res.status(400).json({
        status: "fail",
        message: "Description can't be a number",
      });
    }
    const wishlist = await db.query(
      `SELECT * FROM wishlist WHERE wishlist_id=$1`,
      [id]
    );
    if (wishlist.rows[0].user_id !== req.user.user_id) {
      return res.status(401).json({
        status: "fail",
        message: "You can't edit a wishlist that's not yours",
      });
    }
    const params = [];
    const conditions = [];
    if (name.trim()) {
      params.push(name);
      conditions.push(`name=$${params.length}`);
    }
    if (description.trim()) {
      params.push(description);
      conditions.push(`description=$${params.length}`);
    }
    if (conditions.length === 0)
      return res.status(200).json({
        status: "success",
        length: wishlist.rowCount,
        data: wishlist.rows[0],
      });
    let query = `UPDATE wishlist `;

    query += ` SET ${conditions.join(", ")}`;

    params.push(id);
    query += ` WHERE wishlist_id=$${params.length} RETURNING *`;
    const response = await db.query(query, params);
    res.status(200).json({
      status: "success",
      length: response.rowCount,
      data: response.rows[0],
    });
  } catch (err) {
    let message = err.message;
    if (err.message.includes("unique"))
      message = "You already have a wishlsit with this name";
    res.status(400).json({
      status: "fail",
      message,
    });
  }
};

exports.deleteWishlist = async (req, res) => {
  try {
    const currentUserId = req.user.user_id;
    const checkQuery = `
    SELECT user_id FROM wishlist WHERE wishlist_id=$1
    `;
    const response = await db.query(checkQuery, [req.params.id]);
    if (!response.rowCount || response.rows[0].user_id != currentUserId) {
      return res.status(405).json({
        status: "fail",
        message: "Wishlist doesn't exist or doesn't belong to you.",
      });
    }

    await db.query("COMMIT");
    const deleteQuery = `
    DELETE FROM wishlist WHERE wishlist_id=$1
    `;
    const deleteResponse = await db.query(deleteQuery, [req.params.id]);
    res.status(202).json({
      status: "success",
      length: deleteResponse.rowCount,
      message: "Deleted Successfully",
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
    const wishlistUser = await db.query(
      "SELECT user_id FROM wishlist WHERE wishlist_id=$1",
      [req.params.id]
    );
    if (wishlist.rows[0].user_id !== req.user.user_id) {
      return res.status(401).json({
        status: "fail",
        message:
          "Can't delete place from a wishlist that doens't belong to you.",
      });
    }
    const data = await db.query(
      `DELETE FROM place_wishlist WHERE place_id=$1 AND wishlist_id=$2 RETURNING *`,
      [req.params.place_id, req.params.id]
    );

    if (!data.rowCount) {
      return res.status(400).json({
        status: "fail",
        message: "Place and wishlist combination doesn't exist",
      });
    }

    res.status(200).json({
      status: "success",
      length: data.rowCount,
      data: data.rows[0],
    });
  } catch (err) {
    await db.query("ROLLBACK");
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
