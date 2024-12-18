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
