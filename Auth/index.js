const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRoute = require("./routes/user.routes.js");
const app = express();
app.use(express.json());
require("dotenv").config();

app.use("/", UserRoute);
mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log(process.env.THEN);
    app.listen(process.env.PORT, () =>
      console.log(`Server API Port On ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(process.env.ERROR);
  });
