const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    category_desc: {
      required: true,
      type: String,
    },
    category_name: {
      required: true,
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.static('getAllCategories', function () {
  return this.find();
});
CategorySchema.static('deleteCategoryByID', function (id) {
  return this.deleteOne({ _id: id });
});
module.exports = mongoose.model('categories', CategorySchema);
