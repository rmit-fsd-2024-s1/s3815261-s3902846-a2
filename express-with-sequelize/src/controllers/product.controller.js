const db = require("../database");

// Select all products from the database.
exports.allProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Select one product from the database by ID.
exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await db.Product.findByPk(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
