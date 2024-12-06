const db = require("../db/index.js");
exports.getAllGifts = async (req, res) => {
  try {
    const data = await db.query(`SELECT gift.*,p.name AS place_name
FROM gift
JOIN place p
ON p.place_id=gift.place_id`);

    res.status(200).json({
      status: "success",
      length: data.rows.length,
      data: data.rows,
    });
  } catch (err) {
    console.log(err);
  }
};
