const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function checkToken(req, res, next) {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(403).josn({ message: "add the accessToken" });
    }
    const decodeToken = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET);
    if (!decodeToken) {
      return res.status(403).json({ message: "invalid Token or expired" });
    } else {
      return next();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function checkSuperAdmin(req, res, next) {
  try {
    const authoriz = req.headers.authorization;

    const decodeToken = jwt.verify(authoriz, process.env.ACCESSTOKENSECRET);
    if (!decodeToken) {
      return res.status(401).json({ message: "access denied" });
    } else {
      role = decodeToken.role;
      if (role === "SuperAdmin") {
        next();
      } else {
        return res.status(401).json({ message: "access denied for your role" });
      }
    }
  } catch (err) {
    return res.status(500).josn({ message: err.message });
  }
}

module.exports = {
  checkToken,
  checkSuperAdmin,
};
