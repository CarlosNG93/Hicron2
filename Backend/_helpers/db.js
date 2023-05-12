const { Sequelize } = require("sequelize");
const { dbName, dbConfig } = require("../config.json");

const db = {};

initialize();

async function initialize() {
  const { server, options, authentication } = dbConfig;
  const { userName, password } = authentication.options;

  // create sequelize instance
  const sequelize = new Sequelize(dbName, userName, password, {
    host: server,
    port: options.port,
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
    },
  });

  // init models and add them to the exported db object
  db.User = require("../users/user.model")(sequelize);

  // add sequelize instance to db object
  db.sequelize = sequelize;

  // sync all models with database
  await sequelize.sync({ alter: true });
}

module.exports = db;
