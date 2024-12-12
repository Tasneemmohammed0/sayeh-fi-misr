// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    await db.query("COMMIT");
    const data = await db.query(
      `DELETE FROM review WHERE review_id=$1 AND user_id=$2 RETURNING *`,
      [req.params.id, req.user.user_id]
    );

    res.status(200).json({
      status: "success",
      length: data.rowCount,
      data: data.rows[0],
    });
  } catch (err) {
    await db.query("ROLLBACK");
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};
