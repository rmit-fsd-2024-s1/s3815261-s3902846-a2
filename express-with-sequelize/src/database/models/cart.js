module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      cart_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id",
        },
      },
    },
    {
      timestamps: false,
    }
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "user_id" });
    Cart.hasMany(models.CartItem, { foreignKey: "cart_id" });
  };

  return Cart;
};
