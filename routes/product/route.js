const express = require('express');
const productController = require('../../controller/productController');
const authMiddleware = require('../../middlewares/authMiddleware');
const { authorize } = require('../../middlewares/authorize');
const mongoUpload = require('../../middlewares/mongoUpload');
const router = express.Router();

router
  .route('/')
  .get(authMiddleware, productController.getAllProducts)
  .post(mongoUpload.single('image'), productController.createNewProduct);

router.delete(
  '/:productId',
  authMiddleware,
  authorize('admin'),
  productController.deleteProductById
);
module.exports = router;
