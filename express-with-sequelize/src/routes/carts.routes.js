module.exports = (express, app) => {
  const cartController = require("../controllers/cart.controller.js");
  const router = express.Router();

  // Add item to cart
  router.post("/cart/add", cartController.addItemToCart);

  // View cart
  router.get("/cart/:userId", cartController.viewCart);

  // Remove item from cart
  router.delete("/cart/remove/:cartItemId", cartController.removeItemFromCart);

  // Add routes to server
  app.use("/api", router);
};
