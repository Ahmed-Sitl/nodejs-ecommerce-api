const express = require("express");
const routerCategory = express.Router();

const {
  createCategory,
  getCategories,
  getCategory,
} = require("../services/categoryService");

routerCategory.route("/").post(createCategory).get(getCategories);
routerCategory.route("/:id").get(getCategory);

module.exports = { routerCategory };
