const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../utils/db")

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,

      validate: {
        min: { args: [1991], msg: "Only blogs from 1991 are allowed" },
        max: {
          args: [new Date().getFullYear()],
          msg: "Only blogs until current year are allowed",
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "blog",
  }
)

module.exports = Blog
