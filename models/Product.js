// sku, name, price, quantity, description, image, category
const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'quantity is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    sku: {
      type: String,
      required: [true, 'sku is required'],
      unique: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);
productSchema.virtual('category_detail', {
  ref: 'Category',
  localField: 'category',
  foreignField: 'name',
  justOne: true,
});

module.exports = mongoose.model('Product', productSchema);
