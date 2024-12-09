const db = require("../db/index.js");

// Add Report on a place
exports.addReport = async (req, res) => {
  try {
    const reportData = await db.query(
      `INSERT INTO report (date, severity, reason, description, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        req.body.date,
        req.body.severity,
        req.body.reason,
        req.body.description,
        req.user.user_id,
      ]
    );

    console.log(reportData.rows[0]);

    let data = null;
    if (req.body.entityType === "place") {
      // insert to report_place table
      data = await db.query(
        `INSERT INTO report_place (report_id, place_id) VALUES ($1, $2) RETURNING *`,
        [reportData.rows[0].report_id, req.body.placeId]
      );
    } else {
      // insert to report_gathering table
      data = await db.query(
        `INSERT INTO report_gathering (report_id, gathering_id) VALUES ($1, $2) RETURNING *`,
        [reportData.rows[0].report_id, req.body.gatheringId]
      );
    }

    res.status(200).json({
      status: "success",
      data: data.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err,
    });
  }
};
