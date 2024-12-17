const db = require("../db/index.js");
const { assignBadge } = require("../controllers/badgeSystemController.js");

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
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getGathering = async (req, res) => {
  try {
    const data = await db.query(
      `SELECT * FROM gathering WHERE gathering_id = $1`,
      [req.params.id]
    );
    if (!data.rowCount) {
      res.status(404).json({
        status: "fail",
        message: "Gathering doesn't exist",
      });
    }
    res.status(200).json({
      status: "success",
      data: data.rows[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
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
    if (!gatheringDetails.rowCount) {
      return res.status(404).json({
        status: "fail",
        message: "Gathering doesn't exist",
      });
    }
    const allUsersQuery = `
    SELECT DISTINCT v.user_id, v.first_name, v.last_name, v.profile_pic
    FROM visitor_gathering vg, visitor v
    WHERE vg.user_id=v.user_id AND vg.gathering_id=$1
    `;
    const allUsers = await db.query(allUsersQuery, [req.params.id]);

    const allLanguagesQuery = `
    SELECT spoken_language
    FROM gathering_spoken_language
    WHERE gathering_id=$1
    `;
    const allLanguages = await db.query(allLanguagesQuery, [req.params.id]);

    res.status(200).json({
      status: "success",
      data: {
        gathering: gatheringDetails.rows,
        users: allUsers.rows,
        languages: allLanguages.rows,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteGathering = async (req, res) => {
  try {
    const data = await db.query(
      `DELETE FROM gathering
      WHERE gathering_id= $1 AND host_id=$2`,
      [req.params.id, req.user.user_id]
    );
    if (!data.rowCount) {
      return res.status(401).json({
        status: "fail",
        message:
          "Can't delete a gathering that doesn't exist or doesn't belong to you",
      });
    }
    res.status(200).json({
      status: "success",
      data: data.rows[0],
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
exports.updateGathering = async (req, res) => {
  try {
    const { title, duration, description, max_capacity } = req.body;
    if (!title || !duration || !description || !max_capacity) {
      return res.status(400).json({
        status: "fail",
        message: "Fields are missing",
      });
    }
    const data = await db.query(
      `UPDATE gathering
	    SET  title=$1, duration=$2,  description=$3, max_capacity=$4
	    WHERE gathering_id=$5 AND host_id=$6;`,
      [
        req.body.title,
        req.body.duration,
        req.body.description,
        req.body.max_capacity,
        req.params.id,
        req.user.user_id,
      ]
    );

    if (!data.rowCount) {
      return res.status(401).json({
        status: "fail",
        message: "Can't edit a gathering that doesn't belong to you",
      });
    }
    res.status(200).json({
      status: "success",
      data: data.rows[0],
    });
  } catch (err) {
    let message = err.message;
    if (err.message.includes("duplicate")) {
      message = "Gathering with this title already exists";
    }
    res.status(400).json({
      status: "fail",
      message,
    });
  }
};

exports.createGathering = async (req, res) => {
  try {
    const {
      title,
      duration,
      gathering_date,
      description,
      max_capacity,
      place_name,
    } = req.body;
    if (
      !title ||
      !duration ||
      !gathering_date ||
      !description ||
      !max_capacity ||
      !place_name
    ) {
      res.status(400).json({
        status: "fail",
        message: "There are missing information",
      });
    }

    if (max_capacity <= 0) {
      return res.status(400).json({
        status: "fail",
        message: "Maximum capacity must be a positive number",
      });
    }

    if (duration <= 0) {
      return res.status(400).json({
        status: "fail",
        message: "Duration must be a positive number",
      });
    }

    const placeQuery = "SELECT place_id FROM place WHERE name = $1";
    const placeResult = await db.query(placeQuery, [req.body.place_name]);

    if (!placeResult.rowCount) {
      return res.status(404).json({
        status: "fail",
        message: "Place doesn't exist",
      });
    }

    const place_id = placeResult.rows[0].place_id;

    const insertQuery = `
      INSERT INTO gathering (title, duration, gathering_date, description, max_capacity, place_id, host_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING*
    `;
    const data = await db.query(insertQuery, [
      req.body.title,
      req.body.duration,
      req.body.gathering_date,

      req.body.description,
      req.body.max_capacity,
      place_id,
      req.user.user_id,
    ]);

    res.status(201).json({
      status: "success",
      message: "Insert Successfully",
      data: data.rows[0],
    });
  } catch (err) {
    let message = err.message;
    if (err.message.includes("duplicate"))
      message = "Gathering with this title already exists";
    res.status(400).json({
      status: "fail",
      message,
    });
  }
};

// Add user to gathering
exports.addToGathering = async (req, res) => {
  try {
    const userIdData = await db.query(
      `select distinct user_id from visitor where username=$1`,
      [req.body.username]
    );

    const userId = userIdData.rows[0].user_id;

    const data = await db.query(
      `INSERT INTO visitor_gathering(user_id, gathering_id) VALUES ($1, $2)`,
      [userId, req.params.id]
    );

    res.status(200).json({
      status: "success",
      message: "Joined Successfully",
      data: data.rows[0],
    });
  } catch (err) {
    let message = err.message;
    if (
      err.message == "Cannot read properties of undefined (reading 'user_id')"
    ) {
      message = "Username not found";
    } else if (
      err.message ==
      `duplicate key value violates unique constraint "visitor_gathering_pkey"`
    ) {
      message = "User already in the gathering";
    }

    res.status(400).json({
      status: "fail",
      message,
    });
  }
};

// Delete user from gathering
exports.deleteFromGathering = async (req, res) => {
  try {
    const data = await db.query(
      `delete from visitor_gathering where user_id=$1 and gathering_id=$2 RETURNING *`,
      [req.params.user_id, req.params.id]
    );
    if (!data.rowCount) {
      return res.status(404).json({
        status: "fail",
        message: "User isn't in this gathering",
      });
    }
    res.status(200).json({
      status: "success",
      length: data.rowCount,
      data: data.rows[0],
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Unjoin gathering route handler
exports.leaveGathering = async (req, res) => {
  try {
    const data = await db.query(
      `delete from visitor_gathering where user_id=$1 and gathering_id=$2 RETURNING *`,
      [req.user.user_id, req.params.id]
    );
    if (!data.rowCount) {
      return res.status(404).json({
        status: "fail",
        message: "You're not part of this gathering",
      });
    }
    res.status(200).json({
      status: "success",
      length: data.rowCount,
      data: data.rows[0],
      message: "deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Join gathering route handler
exports.joinGathering = async (req, res) => {
  try {
    const data = await db.query(
      `INSERT INTO visitor_gathering(user_id, gathering_id) VALUES ($1, $2)`,
      [req.user.user_id, req.params.id]
    );

    try {
      await assignBadge(
        req.user.user_id,
        "Top Participant",
        "visitor_gathering",
        5,
        req.body.date
      );
    } catch (err) {
      console.error(err);
    }

    res.status(200).json({
      status: "success",
      message: "Joined Successfully",
      data: data.rows[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// check if gathering is joined
exports.checkJoined = async (req, res) => {
  try {
    const data = await db.query(
      `SELECT EXISTS (SELECT 1 FROM visitor_gathering WHERE user_id = $1 AND gathering_id = $2) AS is_joined`,
      [req.user.user_id, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: data.rows[0].is_joined,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
