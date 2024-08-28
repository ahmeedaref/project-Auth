const User = require("../models/user.js");
const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  createProduct,
  getProducts,
  getproduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/user.controller.js");
const {
  ensureAuth,
  checkSuperAdmin,
} = require("../middellwares/middellwares.js");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/", ensureAuth, createProduct);

router.get("/", ensureAuth, getProducts);

router.get("/:id",ensureAuth,checkSuperAdmin,getproduct)

router.put("/:id", ensureAuth, checkSuperAdmin, updateProduct);

router.delete("/:id", ensureAuth, checkSuperAdmin, deleteProduct);


module.exports = router;
