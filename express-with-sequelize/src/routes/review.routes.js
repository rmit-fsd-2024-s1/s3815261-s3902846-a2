module.exports = (express, app) => {
  const reviewController = require("../controllers/review.controller.js");
  const router = express.Router();

  // Create a new review
  router.post("/review", reviewController.createReview);

  // Get all reviews for a product
  router.get("/reviews/:productId", reviewController.getReviewsByProduct);

  // Update a review
  router.put("/review/:reviewId", reviewController.updateReview);

  // Delete a review
  router.delete("/review/:reviewId", reviewController.deleteReview);

  app.use("/api", router);
};
