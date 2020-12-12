const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: 'img/png',
  },
});

const ProductSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: String,
  },
  amount: {
    required: true,
    type: Number,
  },
  categories: {
    required: true,
    type: [String],
  },
  description: {
    required: true,
    type: String,
  },
  image: {},
});

module.exports = mongoose.model('products', ProductSchema);
