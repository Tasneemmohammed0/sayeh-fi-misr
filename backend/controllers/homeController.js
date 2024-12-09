const db = require("../db/index.js");

exports.getExplorePlaces = async (req, res) => {
  try {
    const data = await db.query(`SELECT p.*, AVG(r.rating) AS rate
FROM place p
LEFT JOIN review r ON p.place_id = r.place_id
GROUP BY p.place_id
ORDER BY place_id ASC LIMIT 4
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

exports.getExploreGatherings = async (req, res) => {
  try {
    const data = await db.query(`SELECT g.*, p.photo,p.city
FROM gathering g
JOIN place p ON g.place_id = p.place_id
ORDER BY gathering_id ASC LIMIT 4
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
