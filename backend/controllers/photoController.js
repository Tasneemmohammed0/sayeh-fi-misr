const db = require("../db/index.js");

// Delete a photo
exports.deletePhoto = async (req, res) => {
  try {
    await db.query("COMMIT");
    const data = await db.query(
      `DELETE FROM photo WHERE photo_id=$1 AND user_id=$2 RETURNING *`,
      [req.params.id, req.user.user_id]
    );

    if (!data.rowCount) {
      return res.status(400).json({
        message:
          "Failed to delete. Photo doesn't exist or doesn't belong to you",
      });
    }

    res.status(200).json({
      status: "success",
      length: data.rowCount,
      data: data.rows[0],
    });
  } catch (err) {
    await db.query("ROLLBACK");
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

// Update a photo
exports.updatePhoto = async (req, res) => {
  try {
    const query = `UPDATE photo SET caption=$1 WHERE photo_id=$2 AND user_id=$3 RETURNING *`;

    const data = await db.query(query, [
      req.body.caption?.trim(),
      req.params.id,
      req.user.user_id,
    ]);

    if (!data.rowCount) {
      return res.status(400).json({
        message: "Failed to edit. Photo doesn't exist or doesn't belong to you",
      });
    }

    res.status(200).json({
      status: "success",
      length: data.rowCount,
      data: data.rows[0],
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
