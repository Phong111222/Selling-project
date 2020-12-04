const express = require('express');
const Category = require('../../models/Category');

const route = express.Router();

route.post('/', async (req, res) => {
  try {
    const { category_name, category_desc } = req.body;
    const ListCategories = await Category.getAllCategories();
    const category = new Category({
      category_id: category_name + ++ListCategories.length,
      category_name,
      category_desc,
    });
    const rs = await category.save();
    res.status(200).json(rs);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const rs = await Category.deleteCategoryByID(id);
    res.status(200).json(rs);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = route;
