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
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getExploreGatherings = async (req, res) => {
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
    host h ON g.host_id = h.user_id
ORDER BY gathering_id ASC LIMIT 4
`);

    res.status(200).json({
      status: "success",
      length: data.rows.length,
      data: data.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getTrendingPlaces = async (req, res) => {
  try {
    const trendingQuery = `SELECT COUNT(*) AS visitsCount,p.name,p.place_id,p.photo
     FROM visitor_place vp,place p
     WHERE vp.place_id=p.place_id
     GROUP BY vp.place_id,p.name,p.place_id
     ORDER BY visitsCount DESC
     LIMIT 3
    `;
    const trendingData = await db.query(trendingQuery);

    if (!trendingData.rowCount) {
      return res.status(404).json({
        status: "fail",
        message: "No trending places found",
      });
    }

    res.status(200).json({
      status: "success",
      length: trendingData.rows.length,
      data: trendingData.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
