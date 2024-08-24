const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  role: {
    type: String,
    enum: ["Admin", "SuperAdmin"],
    default: "Admin",
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
