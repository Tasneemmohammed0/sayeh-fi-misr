const db = require("../db/index.js");

exports.getAllGatherings = async (req, res) => {
  try {
    const data = await db.query(`SELECT 
    g.*,
    p.photo,
    p.city,
    h.first_name,
    (SELECT COUNT(*) 
     FROM visitor_gathering vg 
     WHERE vg.gathering_id = g.gathering_id) AS current_capacity
FROM 
    gathering g
JOIN 
    place p ON g.place_id = p.place_id
JOIN 
    host h ON g.host_id = h.user_id;

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
exports.deleteGathering = async (req, res) => {
  try {
    console.log(req.params);
    const data = await db.query(
      `DELETE FROM gathering
WHERE gathering_id= $1`,
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
