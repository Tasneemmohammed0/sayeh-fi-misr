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
    console.log(gatheringDetails);

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
exports.updateGathering = async (req, res) => {
  try {
    console.log(req.params);
    const data = await db.query(
      `UPDATE gathering
	SET  title=$1, duration=$2,  description=$3, max_capacity=$4
	WHERE gathering_id=$5;`,
      [
        req.body.title,
        req.body.duration,
        req.body.description,
        req.body.max_capacity,
        req.params.id,
      ]
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

exports.createGathering = async (req, res) => {
  try {
    const placeQuery = "SELECT place_id FROM place WHERE name = $1";
    const placeResult = await db.query(placeQuery, [req.body.place_name]);

    const place_id = placeResult.rows[0].place_id;
    console.log(place_id);
    const insertQuery = `
      INSERT INTO gathering (title, duration, gathering_date, description, max_capacity, place_id, host_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await db.query(insertQuery, [
      req.body.title,
      req.body.duration,
      req.body.gathering_date,

      req.body.description,
      req.body.max_capacity,
      place_id,
      req.body.host_id,
    ]);

    res.status(201).json({
      status: "success",
      message: "Insert Successfully",
    });
  } catch (error) {
    console.error(error);
  }
};

exports.addToGathering = async (req, res) => {
  try {
    console.log(req.body);
    const userIdData = await db.query(
      `select distinct user_id from visitor where username=$1`,
      [req.body.username]
    );

    const userId = userIdData.rows[0].user_id;
    console.log(userId);

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
    console.error(err);
    res.status(404).json({
      message: err,
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

    res.status(200).json({
      status: "success",
      message: "Joined Successfully",
      data: data.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      message: err,
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
    console.log(err);
    res.status(404).json({
      message: err,
    });
  }
};

// Add user to gathering
