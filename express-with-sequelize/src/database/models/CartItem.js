module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      cart_item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Carts",
          key: "cart_id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "product_id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      timestamps: false,
    }
  );

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: "cart_id" });
    CartItem.belongsTo(models.Product, { foreignKey: "product_id" });
  };

  return CartItem;
};
