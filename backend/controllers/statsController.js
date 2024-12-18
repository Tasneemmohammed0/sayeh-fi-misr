const db = require("../db/index");

// Get top 5 nationalities
exports.getTopFiveNationalities = async (req, res) => {
  try {
    const data = await db.query(`SELECT nationality, COUNT(*) AS user_count
    FROM visitor_nationality GROUP BY nationality
    ORDER BY user_count DESC LIMIT 5`);

    res.status(200).json({
      status: "success",
      legnth: data.rows.length,
      data: data.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
    console.error(err);
  }
};

exports.getUsersTypes = async (req, res, next) => {
  try {
    const query = `
      SELECT role, COUNT(DISTINCT user_id) AS count
      FROM visitor
      GROUP BY (role)
      `;
    const response = await db.query(query);
    if (!response.rowCount) {
      return res.status(404).json({
        status: "fail",
        message: "No users found",
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
    console.error(err);
  }
};

exports.getPlaceVisits = async (req, res) => {
  try {
    const data = await db.query(
      `SELECT date, COUNT(*) AS visit_count
      FROM visitor_place
      WHERE place_id=$1 and date >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY date
      ORDER BY date;`,
      [req.params.id]
    );

    if (!data.rowCount) {
      return res.status(404).json({
        status: "fail",
        message: "No visits found",
      });
    }

    res.status(200).json({
      status: "success",
      legnth: data.rows.length,
      data: data.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
    console.error(err);
  }
};
