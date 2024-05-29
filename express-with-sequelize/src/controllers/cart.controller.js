const db = require("../database");

// Add item to cart
exports.addItemToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    let cart = await db.Cart.findOne({ where: { user_id } });
    if (!cart) {
      cart = await db.Cart.create({ user_id });
    }

    let cartItem = await db.CartItem.findOne({
      where: { cart_id: cart.cart_id, product_id },
    });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await db.CartItem.create({
        cart_id: cart.cart_id,
        product_id,
        quantity,
      });
    }

    res.json(cartItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// View cart
exports.viewCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await db.Cart.findOne({
      where: { user_id: userId },
      include: [{ model: db.CartItem, include: [db.Product] }],
    });

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    console.error("Error viewing cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId;

    const cartItem = await db.CartItem.findOne({
      where: { cart_item_id: cartItemId },
    });
    if (cartItem) {
      await cartItem.destroy();
      res.json({ message: "Item removed from cart" });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
