const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  try {
    const users = await db.user.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Select one user from the database.
exports.one = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Select one user from the database if email and password are a match.
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Selecting from database where email = inputted email/checking if email exists
    const user = await db.user.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verifying plaintext with password hash stored in database
    const isPasswordValid = await argon2.verify(user.password_hash, password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a user in the database.
exports.create = async (req, res) => {
  const { username, name, email, password } = req.body;
  try {
    const hash = await argon2.hash(password, { type: argon2.argon2id });
    const user = await db.user.create({
      username,
      name,
      email,
      password_hash: hash,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a user identified by the email in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  try {
    const user = await db.user.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the new email is already taken by another user
    if (email) {
      const existingUser = await db.user.findOne({ where: { email } });
      if (existingUser && existingUser.user_id !== parseInt(id)) {
        return res.status(400).json({ message: "Email is already taken" });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await db.user.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
