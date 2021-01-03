const asyncMiddleware = require('../middlewares/asyncMiddleware');
const Product = require('../models/Product');
const ErrorResponse = require('../models/response/error');
const SuccessResponse = require('../models/response/success');

exports.getAllProducts = asyncMiddleware(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json(products);
});
exports.createNewProduct = asyncMiddleware(async (req, res, next) => {
  const { name, price, sku, quantity, description } = req.body;

  const newProduct = new Product({
    name,
    price,
    sku,
    quantity,
    description,
    image: req.file.filename,
  });
  const product = await newProduct.save();
  res.status(201).json(product);
});

exports.deleteProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  const doc = await Product.findByIdAndDelete(productId);
  if (!doc) {
    return next(new ErrorResponse(404, 'Product is not found'));
  }
  return res
    .status(200)
    .json(new SuccessResponse(200, `product has id ${productId} was deleted`));
});
