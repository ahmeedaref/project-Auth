const User = require("../models/user.js");
const Product = require("../models/product.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    if (!email || !username || !password) {
      return res.status(422).json({ message: "please fill in all fields" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "email already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    User.create({
      username,
      email,
      password: hashPassword,
      role,
    });

    res.status(200).json({ message: "Registered Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "please fill in all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Wrong email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Wrong email or password" });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.ACCESSTOKENSECRET,
      { subject: user.role, expiresIn: "1h" }
    );
    res.status(200).json({ message: "Logged Successfully", accessToken });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const product = await Product.create(req.headers);

    res.status(200).json({ username: user.username, role: user.role, product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const product = await Product.find({});

    res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.headers);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json({ message: "updated successfully", updatedProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "Product Deleted  Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
