const express = require("express");
const routerCategory = express.Router();

const {
  createCategory,
  getCategories,
} = require("../services/categoryService");

routerCategory.post("/", async (req, res) => {
  await createCategory(req, res);
});

routerCategory.get("/", async (req, res) => {
  await getCategories(req, res);
});

module.exports = { routerCategory };
