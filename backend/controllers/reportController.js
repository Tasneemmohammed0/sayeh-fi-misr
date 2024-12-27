const db = require("../db/index.js");

// Add Report on a place
exports.addReport = async (req, res) => {
  try {
    const { date, severity, reason, description } = req.body;
    if (!severity || !reason.trim() || !description.trim()) {
      return res.status(400).json({
        status: "fail",
        message: "Can't leave empty fields",
      });
    }
    const reportData = await db.query(
      `INSERT INTO report (date, severity, reason, description, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [date, severity, reason, description, req.user.user_id]
    );
    let data = null;
    if (req.body.entityType === "place") {
      // insert to report_place table
      data = await db.query(
        `INSERT INTO report_place (report_id, place_id) VALUES ($1, $2) RETURNING *`,
        [reportData.rows[0].report_id, req.body.placeId]
      );
    } else if (req.body.entityType === "gathering") {
      // insert to report_gathering table
      data = await db.query(
        `INSERT INTO report_gathering (report_id, gathering_id) VALUES ($1, $2) RETURNING *`,
        [reportData.rows[0].report_id, req.body.gatheringId]
      );
    } else {
      return res.status(400).json({
        status: "fail",
        message: "Entity type doesn't exist",
      });
    }

    res.status(200).json({
      status: "success",
      data: data.rows[0],
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
