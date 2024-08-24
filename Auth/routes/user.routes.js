const User = require("../models/user.js");
const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/user.controller.js");

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
