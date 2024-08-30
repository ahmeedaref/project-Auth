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
  checkToken,
  checkSuperAdmin,
} = require("../middellwares/middellwares.js");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/", checkToken, createProduct);

router.get("/", checkToken, getProducts);

router.get("/:id", checkToken, getproduct);

router.put("/:id", checkToken, checkSuperAdmin, updateProduct);

router.delete("/:id", checkToken, checkSuperAdmin, deleteProduct);

module.exports = router;
