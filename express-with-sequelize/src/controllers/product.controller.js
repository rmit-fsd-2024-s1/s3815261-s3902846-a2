const db = require("../database");

// Select all products from the database.
exports.all = async (req, res) => {
  try {

    const products = await db.product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a product in the database.
exports.create = async (req, res) => {
  try {
    const { name, image, price, discount, isOnSpecial } = req.body;
    const product = await db.product.create({
      name,
      image,
      price,
      discount,
      isOnSpecial,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
