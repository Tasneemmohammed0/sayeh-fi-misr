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
    DELETE FROM place WHERE place_id=$1;
    `;
    const response = await db.query(query, [req.params.id]);
    res.status(200).json({
      status: "success",
      length: response.rowCount,
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
    const place = {
      name: req.body.name,
      location: req.body.location,
      city: req.body.city,
      photo: req.body.photo,
      type: req.body.type,
      description: req.body.description,
      foreign_adult_ticket_price: req.body.foreign_adult_ticket_price,
      foreign_student_ticket_price: req.body.foreign_student_ticket_price,
      egyptian_adult_ticket_price: req.body.egyptian_adult_ticket_price,
      egyptian_student_ticket_price: req.body.egyptian_student_ticket_price,
      opening_hours_holidays: req.body.opening_hours_holidays,
      opening_hours_working_days: req.body.opening_hours_working_days,
    };
    const query = `
    INSERT INTO place 
    (name, location, city, photo,type, description, foreign_adult_ticket_price, foreign_student_ticket_price, egyptian_adult_ticket_price, egyptian_student_ticket_price, opening_hours_holidays, opening_hours_working_days)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;
    const params = Object.values(place);
    const response = await db.query(query, params);
    res.status(200).json({
      status: "success",
      length: response.rowCount,
      data: response.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
