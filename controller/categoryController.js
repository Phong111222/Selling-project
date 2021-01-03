const asyncMiddleware = require('../middlewares/asyncMiddleware');
const Category = require('../models/Category');
const ErrorResponse = require('../models/response/error');
const SuccessResponse = require('../models/response/success');

exports.getAllCategories = asyncMiddleware(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

exports.createCategory = asyncMiddleware(async (req, res) => {
  const { category_name, category_desc } = req.body;

  const category = new Category({
    category_name,
    category_desc,
  });
  const rs = await category.save();
  res.status(200).json(rs);
});

exports.deleteCategoryById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;

  const doc = await Category.deleteCategoryByID(id);
  if (!doc) {
    return next(new ErrorResponse(404, 'Category ID not found'));
  }
  res
    .status(200)
    .json(new SuccessResponse(200, `Category with id ${id} was deleted`));
});
