module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    },
    isOnSpecial: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    timestamps: true,
  });

  return Product;
};
