const db = require("../db/index");

exports.getAll = async (req, res, next) => {
  try {
    console.log("PARAMS:", req.params);
    const { username, email, age, role, gender } = req.query;
    let query = `SELECT DISTINCT * FROM visitor`;
    const params = [];
    const conditions = [];

    if (username) {
      params.push(`%${username}%`); // contains the name queried
      conditions.push(`username LIKE $${params.length}`); //  params.length = 1, 'name ILIKE $1'
    }
    if (email) {
      params.push(`%${email}%`);
      conditions.push(`email LIKE $${params.length}`);
    }
    if (age) {
      params.push(`%${age}%`);
      conditions.push(`age = $${params.length}`);
    }
    if (role) {
      params.push(`%${role}%`);
      conditions.push(`role LIKE $${params.length}`);
    }
    if (gender) {
      params.push(`%${gender}%`);
      conditions.push(`gender LIKE $${params.length}`);
    }
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    const result = await db.query(query, params);
    res.status(200).json({
      status: "success",
      length: result.rowCount,
      data: result.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const query = `
    DELETE FROM visitor WHERE user_id=$1 RETURNING *
    `;
    const response = await db.query(query, [req.params.id]);
    response.rows[0].password = undefined;
    res.status(200).json({
      status: response.rowCount ? "success" : "fail",
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
exports.createAdmin = async (req, res, next) => {
  try {
    const insertAdminQuery = `
      INSERT INTO admin 
      SELECT DISTINCT *
      FROM visitor
      WHERE user_id = $1;
      `;
    await db.query(insertAdminQuery, [req.params.id]);

    if (req.body.role === "host") {
      const deleteFromHostQuery = `
          DELETE FROM host
          WHERE user_id = $1
        `;
      await db.query(deleteFromHostQuery, [req.params.id]);
    }

    await db.query("UPDATE visitor SET role='admin' WHERE user_id=$1", [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      message: "User promoted to admin successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deletePlace = async (req, res, next) => {
  try {
    await db.query("COMMIT");
    const query = `
    DELETE FROM place WHERE place_id=$1 RETURNING *;
    `;
    const response = await db.query(query, [req.params.id]);

    if (!response.rowCount) {
      return res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }

    res.status(200).json({
      status: "success",
      length: response.rowCount,
      data: response.rows[0],
    });
  } catch (err) {
    await db.query("ROLLBACK");
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createPlace = async (req, res, next) => {
  try {
    const {
      name,
      location,
      city,
      photo,
      type,
      description,
      foreign_adult_ticket_price,
      egyptian_adult_ticket_price,
      foreign_student_ticket_price,
      egyptian_student_ticket_price,
      opening_hours_holidays,
      opening_hours_working_days,
    } = req.body;

    // Validate empty fields
    if (
      !name ||
      !location ||
      !city ||
      !type ||
      !description ||
      foreign_adult_ticket_price === undefined ||
      egyptian_adult_ticket_price === undefined ||
      foreign_student_ticket_price === undefined ||
      egyptian_student_ticket_price === undefined ||
      !opening_hours_holidays ||
      !opening_hours_working_days
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Fields are missing",
      });
    }

    // Validate ticket prices
    const ticketPrices = [
      +foreign_adult_ticket_price,
      +egyptian_adult_ticket_price,
      +foreign_student_ticket_price,
      +egyptian_student_ticket_price,
    ];
    if (ticketPrices.some((price) => typeof price !== "number" || price < 0)) {
      return res.status(400).json({
        status: "fail",
        message: "Ticket prices must be non-negative numbers.",
      });
    }

    // Validate opening hours format (just string)
    if (
      typeof opening_hours_holidays !== "string" ||
      typeof opening_hours_working_days !== "string"
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Opening hours must be strings.",
      });
    }

    const place = {
      name,
      location,
      city,
      photo,
      type,
      description,
      foreign_adult_ticket_price,
      foreign_student_ticket_price,
      egyptian_adult_ticket_price,
      egyptian_student_ticket_price,
      opening_hours_holidays,
      opening_hours_working_days,
    };

    const query = `
    INSERT INTO place 
    (name, location, city, photo,type, description, foreign_adult_ticket_price, foreign_student_ticket_price, egyptian_adult_ticket_price, egyptian_student_ticket_price, opening_hours_holidays, opening_hours_working_days)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *;
    `;
    const params = Object.values(place);
    const response = await db.query(query, params);
    res.status(200).json({
      status: "success",
      length: response.rowCount,
      data: response.rows,
    });
  } catch (err) {
    let message = err.message;
    console.log(err.message);
    if (err.message.includes("duplicate")) {
      if (err.message.includes("place_name_key"))
        message = "There's already a place with this name";
      else if (err.message.includes("place_location_key"))
        message = "There's already a place in this location";
    }
    res.status(400).json({
      status: "fail",
      message,
    });
  }
};

exports.updatePlace = async (req, res, next) => {
  try {
    let query = `
    UPDATE place
    `;
    const { place_id } = req.body;
    if (!place_id) {
      return res.status(400).json({
        status: "fail",
        message: "There's no such place id",
      });
    }
    const params = [];
    const conditions = [];
    if (req.body.name) {
      params.push(req.body.name);
      conditions.push(` name=$${params.length}`);
    }
    if (req.body.location) {
      params.push(req.body.location);
      conditions.push(`location=$${params.length}`);
    }
    if (req.body.city) {
      params.push(req.body.city);
      conditions.push(`city=$${params.length}`);
    }
    if (req.body.photo) {
      params.push(req.body.photo);
      conditions.push(`photo=$${params.length}`);
    }
    if (req.body.description) {
      params.push(req.body.description);
      conditions.push(`description=$${params.length}`);
    }
    if (req.body.foreign_adult_ticket_price != undefined) {
      if (+req.body.foreign_adult_ticket_price < 0)
        return res.status(400).json({
          status: "fail",
          message: "Opening hours must be positive numbers.",
        });
      params.push(req.body.foreign_adult_ticket_price);
      conditions.push(`foreign_adult_ticket_price=$${params.length}`);
    }
    if (req.body.foreign_student_ticket_price != undefined) {
      if (+req.body.foreign_student_ticket_price < 0)
        return res.status(400).json({
          status: "fail",
          message: "Opening hours must be positive numbers.",
        });
      params.push(req.body.foreign_student_ticket_price);
      conditions.push(`foreign_student_ticket_price=$${params.length}`);
    }
    if (req.body.egyptian_student_ticket_price != undefined) {
      if (+req.body.foreign_student_ticket_price < 0)
        return res.status(400).json({
          status: "fail",
          message: "Opening hours must be positive numbers.",
        });
      params.push(req.body.egyptian_student_ticket_price);
      conditions.push(`egyptian_student_ticket_price=$${params.length}`);
    }
    if (req.body.egyptian_adult_ticket_price != undefined) {
      if (+req.body.foreign_student_ticket_price < 0)
        return res.status(400).json({
          status: "fail",
          message: "Opening hours must be positive numbers.",
        });
      params.push(req.body.egyptian_adult_ticket_price);
      conditions.push(`egyptian_adult_ticket_price=$${params.length}`);
    }
    if (req.body.opening_hours_holidays) {
      params.push(req.body.opening_hours_holidays);
      conditions.push(`opening_hours_holidays=$${params.length}`);
    }
    if (req.body.opening_hours_working_days) {
      params.push(req.body.opening_hours_working_days);
      conditions.push(`opening_hours_working_days=$${params.length}`);
    }
    params.push(place_id);
    if (conditions.length > 0) {
      query += ` SET ${conditions.join(", ")} WHERE place_id=$${
        params.length
      } RETURNING *`;
    }

    const response = await db.query(query, params);
    res.status(200).json({
      status: "success",
      length: response.rowCount,
      data: response.rows,
    });
  } catch (err) {
    let message = err.message;
    if (err.message.includes("duplicate")) {
      if (err.message.includes("place_name_key"))
        message = "Place with this name already exists";
      else if (err.message.includes("place_location_key"))
        message = "place in this location already exists";
    }
    res.status(400).json({
      status: "fail",
      message,
    });
  }
};

exports.getReports = async (req, res, next) => {
  try {
    const gatheringQuery = `
    SELECT distinct  r.*, rg.*, g.gathering_id, g.title as name, p.name AS place_name ,u.username
    FROM report r, report_gathering rg, gathering g, place p, visitor u
    WHERE r.report_id=rg.report_id AND g.gathering_id = rg.gathering_id AND p.place_id=g.place_id  and u.user_id=r.user_id;
    `;
    const gatheringResponse = await db.query(gatheringQuery);
    const gatherings = gatheringResponse.rows;

    const placesQuery = `
    SELECT distinct r.*, rp.*, p.name, p.photo,u.username
    FROM report r, report_place rp, place p, visitor u
    WHERE r.report_id=rp.report_id AND p.place_id=rp.place_id AND u.user_id=r.user_id;
    `;
    const placesResponse = await db.query(placesQuery);
    const places = placesResponse.rows;

    res.status(200).json({
      status: "success",
      length: placesResponse.rowCount + gatheringResponse.rowCount,
      data: {
        gatherings_reports: gatherings,
        places_reports: places,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.resolveReport = async (req, res, next) => {
  try {
    const query = `
    DELETE FROM report WHERE report_id=$1
    `;
    const response = await db.query(query, [req.params.id]);
    res.status(200).json({
      status: "success",
      length: response.rowCount,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
