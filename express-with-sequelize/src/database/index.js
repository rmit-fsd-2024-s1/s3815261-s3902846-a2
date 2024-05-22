const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {};

// Create Sequelize instance.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Import models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);

// Set up relationships.
db.post.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });

// Synchronize database.
db.sync = async () => {
  await db.sequelize.sync();
  await seedData();
};

async function seedData() {
  const count = await db.user.count();
  if (count > 0) return;

  const argon2 = require("argon2");
  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({ username: "mbolger", password_hash: hash, name: "Matthew Bolger", email: "abcde@test.com.au" });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ username: "shekhar", password_hash: hash, name: "Shekhar Kalra", email: "abcde2@test.com.au" });
}

module.exports = db;
