module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      review_id: {
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
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "product_id",
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comment: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
          isLongEnough(value) {
            if (value && value.split(" ").length > 100) {
              throw new Error("Comment cannot exceed 100 words");
            }
          },
        },
      },
    },
    {
      timestamps: true,
    }
  );

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: "user_id" });
    Review.belongsTo(models.Product, { foreignKey: "product_id" });
  };

  return Review;
};
