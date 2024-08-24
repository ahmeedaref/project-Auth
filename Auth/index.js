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
  .connect(
    "mongodb+srv://ahmedaref127:ahmeed1902@backenddb.1rq3a.mongodb.net/Node?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected To DB");
    app.listen(process.env.PORT, () =>
      console.log(`Server API Port On ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
