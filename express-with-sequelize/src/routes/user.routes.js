module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:id", controller.one);

  // Select one user from the database if email and password are a match.
  router.post("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  router.put("/:id", controller.update);

  // Update a user with email.
  router.put("/:email", controller.update);

  // Add routes to server.
  app.use("/api/users", router);
};
