const db = require("../db/index.js");

exports.getAllGatherings = async (req, res) => {
  try {
    const data = await db.query(`SELECT g.*, p.photo,p.city
FROM gathering g
JOIN place p ON g.place_id = p.place_id;
`);

    res.status(200).json({
      status: "success",
      length: data.rows.length,
      data: data.rows,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getGathering = async (req, res) => {
  try {
    console.log(req.params);
    const data = await db.query(
      `SELECT * FROM gathering WHERE gathering_id = $1`,
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: data.rows[0],
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
