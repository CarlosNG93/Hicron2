const { Sequelize } = require("sequelize");
const { dbName, dbConfig } = require("../config.json");

const db = {};

// create sequelize instance
const sequelize = new Sequelize(
  dbName,
  dbConfig.authentication.options.userName,
  dbConfig.authentication.options.password,
  {
    host: dbConfig.server,
    port: dbConfig.options.port,
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
    },
  }
);

// init models and add them to the exported db object
db.User = require("../users/user.model")(sequelize);
db.Vacation = require("../vacations/vacations.model")(sequelize);

// add sequelize instance to db object
db.sequelize = sequelize;

// sync all models with database
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

module.exports = db;
