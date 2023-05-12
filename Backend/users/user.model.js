const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const users = {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
    number_absence: { type: DataTypes.INTEGER, allowNull: false },
  };

  const vacations = {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "Id",
      },
      state: { type: DataTypes.STRING, allowNull: false },
    },
  };

  const options = {
    defaultScope: {
      // exclude hash by default
      users: { exclude: ["hash"] },
      vacations: { exclude: ["hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { users: {}, vacations: {} },
    },
  };

  return sequelize.define("User", attributes, options);
}
