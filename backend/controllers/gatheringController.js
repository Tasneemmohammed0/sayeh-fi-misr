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

exports.getGatheringDetails = async (req, res) => {
  try {
    console.log(req.params.id);
    const gatheringDetailsQuery = `
    SELECT g.*, p.name, p.photo, p.location, h.profile_pic, h.first_name, h.last_name, h.phone_number
    FROM gathering g, place p, host h
    WHERE g.place_id=p.place_id AND g.host_id=h.user_id AND g.gathering_id=$1
    `;
    const gatheringDetails = await db.query(gatheringDetailsQuery, [
      req.params.id,
    ]);

    const allUsersQuery = `
    SELECT v.user_id, v.first_name, v.last_name, v.profile_pic
    FROM visitor_gathering vg, visitor v
    WHERE vg.user_id=v.user_id AND vg.gathering_id=$1
    `;
    console.log(gatheringDetails.rows);

    const allUsers = await db.query(allUsersQuery, [req.params.id]);
    res.status(200).json({
      status: "success",
      data: {
        gathering: gatheringDetails.rows,
        users: allUsers.rows,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
