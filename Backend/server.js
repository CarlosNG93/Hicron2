﻿require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");

const errorHandler = require("_middleware/error-handler");
const sequelize = require("sequelize");
const db = require("./_helpers/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use("/users", require("./users/users.controller"));
app.use("/vacations", require("./vacations/vacations.controller"));

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 3000;
//app.listen(port, () => console.log("Server listening on port " + port));

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);
    app.listen(3000, () =>
      console.log(`Server running at http://localhost:3000`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
