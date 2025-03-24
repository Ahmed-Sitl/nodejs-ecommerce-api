const express = require("express");
const routerCategory = express.Router();

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

routerCategory.route("/").post(createCategory).get(getCategories);
routerCategory
  .route("/:id")
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = { routerCategory };
