const db = require("../db/index");
const { format, subDays } = require("date-fns");

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

exports.getPopularGathering = async (req, res, next) => {
  try {
    const query = `
    SELECT gathering_id, COUNT(gathering_id) AS count
    FROM visitor_gathering
    GROUP BY(gathering_id)
    ORDER BY count DESC
    LIMIT 1
    `;

    const response = await db.query(query);
    if (!response.rowCount) {
      return res.status(404).json({
        status: "fail",
        message: "No gatherings found",
      });
    }

    res.status(200).json({
      status: "success",
      length: response.rowCount,
      data: response.rows[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
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
    const dataId = await db.query(
      `SELECT place_id FROM place WHERE name = $1`,
      [req.params.name]
    );
    const placeId = dataId.rows[0].place_id;
    const data = await db.query(
      `SELECT date, COUNT(*) AS visit_count
      FROM visitor_place
      WHERE place_id=$1 and date >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY date
      ORDER BY date;`,
      [placeId]
    );

    if (!data.rowCount) {
      return res.status(404).json({
        status: "fail",
        message: "No visits found",
      });
    }

    // Generate an array of the last 7 days
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(format(subDays(new Date(), i), "yyyy-MM-dd"));
    }
    days.reverse(); // Ensure ascending order
    const totalDays = [];
    for (let i = 0; i < days.length; i += 1) {
      const day = days[i];
      const found = data.rows.find(
        (row) => row.date.toISOString().split("T")[0] === day
      );
      totalDays.push({
        visit_date: day,
        visit_count: found ? +found.visit_count : 0,
      });
    }

    res.status(200).json({
      status: "success",
      legnth: totalDays.length,
      data: totalDays,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
    console.error(err);
  }
};

exports.getAvgRatings = async (req, res) => {
  try {
    const query = `
    SELECT  p.city, AVG(r.rating) AS rate
    FROM place p
    LEFT JOIN review r ON p.place_id = r.place_id
    WHERE p.city ILIKE $1
    GROUP BY p.city
    ORDER BY rate ASC
    `;

    const response = await db.query(query, [req.params.city]);

    if (!response.rowCount)
      return res.status(404).json({
        status: "fail",
        message: "City doesn't exist in our database",
      });

    if (response.rows[0]?.rate === null) response.rows[0].rate = 0;

    res.status(200).json({
      status: "success",
      data: response.rows[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getActivitiesCount = async (req, res) => {
  try {
    const query = `
   SELECT 
    p.type,
   
    COUNT(DISTINCT vp.place_id) AS visits_count,
    COUNT(DISTINCT g.place_id) AS gatherings_count,
    COUNT(DISTINCT r.place_id) AS reviews_count,
    COUNT(DISTINCT ph.place_id) AS photos_count
FROM 
    place p
LEFT JOIN visitor_place vp ON vp.place_id = p.place_id
LEFT JOIN gathering g ON g.place_id = p.place_id
LEFT JOIN review r ON r.place_id = p.place_id
LEFT JOIN photo ph ON ph.place_id = p.place_id
GROUP BY 
    p.type
   

    `;

    const response = await db.query(query);

    res.status(200).json({
      status: "success",
      data: response.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
