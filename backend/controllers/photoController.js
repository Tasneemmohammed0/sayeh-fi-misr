const db = require("../db/index.js");

// Delete a photo
exports.deletePhoto = async (req, res) => {
  try {
    const data = await db.query(
      `DELETE FROM photo WHERE photo_id=$1 AND user_id=$2`,
      [req.params.id, req.user.user_id]
    );

    res.status(200).json({
      status: "success",
      data: data.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err.message,
    });
  }
};
