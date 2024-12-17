const db = require("../db/index");

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
  }
};
