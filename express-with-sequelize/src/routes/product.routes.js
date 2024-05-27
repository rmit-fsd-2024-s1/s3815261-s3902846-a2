module.exports = (express, app) => {
  const controller = require("../controllers/product.controller.js");
  const router = express.Router();

  // Select all products.
  router.get("/", controller.all);

  // Select products that are on special.
  router.get("/specials", controller.specials);

  // Create a new product.
  router.post("/", controller.create);

  // Add routes to server.
  app.use("/api/product", router);
};
