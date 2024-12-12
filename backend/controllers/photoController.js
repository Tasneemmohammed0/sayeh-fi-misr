const db = require("../db/index.js");

// Delete a photo
exports.deletePhoto = async (req, res) => {
  try {
    await db.query("COMMIT");
    const data = await db.query(
      `DELETE FROM photo WHERE photo_id=$1 AND user_id=$2 RETURNING *`,
      [req.params.id, req.user.user_id]
    );

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
    let query = `UPDATE photo `;
    const params = [];
    const conditions = [];
    const { caption, photo } = req.body;
    console.log(caption, photo);

    if (caption) {
      params.push(caption);
      conditions.push(`caption = $${params.length}`);
    }

    if (photo) {
      params.push(photo);
      conditions.push(`photo = $${params.length}`);
    }
    params.push(req.params.id);

    if (conditions.length > 0) {
      console.log(params.length);
      query += `SET ${conditions.join(", ")} WHERE photo_id = $${
        params.length
      } AND user_id = $${params.length + 1} RETURNING *`;
    }

    params.push(req.user.user_id);
    const data = await db.query(query, params);

    res.status(200).json({
      status: "success",
      length: data.rowCount,
      data: data.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err.message,
    });
  }
};
