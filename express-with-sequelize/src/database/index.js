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
db.product = require("./models/product.js")(db.sequelize, DataTypes);


// Synchronize database.
db.sync = async () => {
  await db.sequelize.sync();
  await seedData();
};

async function seedData() {
  const count = await db.user.count();
  if (count > 0) return;

  // Test profile
  const argon2 = require("argon2");
  let hash = await argon2.hash("test", { type: argon2.argon2id });
  await db.user.create({ username: "test", password_hash: hash, name: "Test Tester", email: "test@gmail.com" });

  // Creating all the products into database
  await db.product.create({
    name: "Tomatoes",
    image: "https://images.unsplash.com/photo-1553395572-0ef353a212bf?q=80&w=3315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 2.5,
    discount: 0.2,
    isOnSpecial: false
  });

  await db.product.create({
    name: "Lettuce",
    image: "https://images.unsplash.com/photo-1504721838965-dfcb29cc11f5?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 3.5,
    discount: 0.2,
    isOnSpecial: false
  });

  await db.product.create({
    name: "Capsicum",
    image: "https://images.unsplash.com/photo-1592548868664-f8b4e4b1cfb7?q=80&w=3391&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 3.0,
    discount: 0.2,
    isOnSpecial: false
  });

  await db.product.create({
    name: "Carrots",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=3329&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 2.5,
    discount: 0.2,
    isOnSpecial: false
  });

  await db.product.create({
    name: "Broccoli",
    image: "https://images.unsplash.com/photo-1583663848850-46af132dc08e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 3.5,
    discount: 0.2,
    isOnSpecial: false
  });

  await db.product.create({
    name: "Spinach",
    image: "https://images.unsplash.com/photo-1578283326173-fbb0f83b59b2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 5.0,
    discount: 0.2,
    isOnSpecial: true
  });

  await db.product.create({
    name: "Cucumbers",
    image: "https://images.unsplash.com/photo-1611048661702-7b55eed346b4?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 2.0,
    discount: 0.2,
    isOnSpecial: false
  });

  await db.product.create({
    name: "Garlic",
    image: "https://images.unsplash.com/photo-1625229466998-42ee9c597290?q=80&w=3064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 3.5,
    discount: 0.2,
    isOnSpecial: true
  });

  await db.product.create({
    name: "Red Onion",
    image: "https://images.unsplash.com/photo-1599145566106-fa02aafba0b4?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 1.5,
    discount: 0.2,
    isOnSpecial: false
  });

  await db.product.create({
    name: "Potatoes",
    image: "https://images.unsplash.com/photo-1635774855536-9728f2610245?q=80&w=3435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 1.5,
    discount: 0.2,
    isOnSpecial: true
  });

  await db.product.create({
    name: "Zucchini",
    image: "https://images.unsplash.com/photo-1596056094719-10ba4f7ea650?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 3.5,
    discount: 0.2,
    isOnSpecial: false
  });

  await db.product.create({
    name: "Button Mushrooms",
    image: "https://images.unsplash.com/photo-1552825898-07e419204683?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 4.0,
    discount: 0.2,
    isOnSpecial: true
  });

  await db.product.create({
    name: "Green Beans",
    image: "https://images.unsplash.com/photo-1563746785-be24526199ea?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 3.5,
    discount: 0.2,
    isOnSpecial: false
  });

  await db.product.create({
    name: "Radish",
    image: "https://plus.unsplash.com/premium_photo-1669680785872-e0dd7190113c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 2.0,
    discount: 0.2,
    isOnSpecial: false
  });

  await db.product.create({
    name: "Kidney Beans",
    image: "https://plus.unsplash.com/premium_photo-1671130295242-582789bd9861?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 3.5,
    discount: 0.2,
    isOnSpecial: true
  });

}

module.exports = db;
