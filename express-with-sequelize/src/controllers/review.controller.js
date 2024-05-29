const db = require("../database");

exports.createReview = async (req, res) => {
  try {
    const { user_id, product_id, rating, comment } = req.body;
    const review = await db.Review.create({
      user_id,
      product_id,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await db.Review.findAll({
      where: { product_id: productId },
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const review = await db.Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    review.rating = rating;
    review.comment = comment;
    await review.save();
    res.status(200).json(review);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await db.Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    await review.destroy();
    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
