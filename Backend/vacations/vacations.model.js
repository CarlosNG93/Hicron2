const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const vacations = {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "Id" },
    },
  };

  const options = {
    defaultScope: {
      // exclude hash by default
      vacations: { exclude: ["hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { vacations: {} },
    },
  };

  return sequelize.define("Vacation", vacations, options);
}
