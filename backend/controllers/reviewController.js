const db = require("../db/index");
const { deleteBadge } = require("../controllers/badgeSystemController.js");

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    await db.query("COMMIT");
    const data = await db.query(
      `DELETE FROM review WHERE review_id=$1 AND user_id=$2 RETURNING *`,
      [req.params.id, req.user.user_id]
    );

    if (!data.rowCount) {
      res.status(400).json({
        message: "Review doesn't exist or it doesn't belong to you.",
      });
      return;
    }
    try {
      await deleteBadge(req.user.user_id, "Top Reviewer", "review", 5);
    } catch (err) {
      console.error(err.message);
    }
    res.status(200).json({
      status: "success",
      length: data.rowCount,
      data: data.rows[0],
    });
  } catch (err) {
    await db.query("ROLLBACK");
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    let query = `Update review `;
    const params = [];
    const conditions = [];
    const { rating, title, main_content } = req.body;
    if (rating) {
      params.push(rating);
      conditions.push(`rating=$${params.length}`);
    }

    if (title) {
      params.push(title);
      conditions.push(`title=$${params.length}`);
    }

    if (main_content) {
      params.push(main_content);
      conditions.push(`main_content=$${params.length}`);
    }

    params.push(req.params.id);

    if (conditions.length > 0) {
      query += `SET ${conditions.join(", ")} WHERE review_id = $${
        params.length
      } AND user_id = $${params.length + 1} RETURNING *`;
    }

    params.push(req.user.user_id);

    const data = await db.query(query, params);

    if (!data.rowCount) {
      return res.status(400).json({
        message: "Failed to edit",
      });
    }

    res.status(200).json({
      status: "success",
      length: data.rowCount,
      data: data.rows[0],
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
