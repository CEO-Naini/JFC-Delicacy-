const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  image: {
    type: String,
    required: true,
    match: [/^https?:\/\/.+/, "Please enter a valid image URL"],
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    stars: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
