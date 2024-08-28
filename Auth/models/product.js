const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    requird: true,
    trim: true,
  },
  price: {
    type: Number,
    requird: true,
  },
  quantity: {
    type: Number,
    requird: true,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;