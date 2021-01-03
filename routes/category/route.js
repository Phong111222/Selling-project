const express = require('express');
const categoryController = require('../../controller/categoryController');

const route = express.Router();

route
  .route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

route.delete('/:id', categoryController.deleteCategoryById);

module.exports = route;
