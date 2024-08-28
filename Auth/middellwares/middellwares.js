const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function ensureAuth(req, res, next) {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(403).josn({ message: "add the accessToken" });
    }
    const decodeToken = jwt.verify(accessToken, process.env.ACCESSTOKENSECRET);
    if (decodeToken) {
      req.user = {
        id: decodeToken.userId,
      };
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "invalid Token or expired" });
  }
}

async function checkSuperAdmin(req, res, next) {
  try {
    const authoriz = req.headers.authorization;
    const decodeToken = jwt.verify(authoriz, process.env.ACCESSTOKENSECRET);

    roleAdmin = decodeToken.role;

    if (roleAdmin === "SuperAdmin") {
      next();
    } else {
      return res.status(401).json({ message: "access denied" });
    }
  } catch (err) {
    return res.status(500).josn({ message: err.message });
  }
}

module.exports = {
  ensureAuth,
  checkSuperAdmin,
};
