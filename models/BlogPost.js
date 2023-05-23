// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");
const User = require("./User");

// Initialize BlogPost model (table) by extending off Sequelize's Model class
class BlogPost extends Model {}

// set up fields and rules for BlogPost model
BlogPost.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comments: {
      type: DataTypes.JSON,
      // allowNull: false,
    },
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_post: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_time: {
      type: DataTypes.DATEONLY,
      allowNull: false,

      // defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "blogpost",
  }
);

BlogPost.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = BlogPost;
