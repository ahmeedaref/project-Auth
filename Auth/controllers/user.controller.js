const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    console.log(`Hi Register`);
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
      },
      process.env.ACCESSTOKENSECRET,
      { subject: user.role, expiresIn: "1h" }
    );
    console.log(`env: ${process.env.ACCESSTOKENSECRET}`);

    res.status(200).json({ message: "Logged Successfully", accessToken });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
