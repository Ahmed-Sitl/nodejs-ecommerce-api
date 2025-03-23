const { CategoryModel } = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

// @desc Get all categories
// @route GET /api/v1/categories
// @access Public
// @returns {Array} An array of categories
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  const count = await CategoryModel.countDocuments();
  res.status(200).json({ total: count, page, limit, data: categories });
});

// @desc Get a single category
// @route GET /api/v1/categories/:id
// @access Public
// @param {string} id - The ID of the category
// @returns {object} The category object
// @throws {Error} If the category is not found
exports.getCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(category);
});

// @desc Create new category
// @route POST /api/v1/categories
// @access Private
// @param {string} name - The name of the category
// @returns {object} The created category
// @throws {Error} If the category name is not provided
// @throws {Error} If the category name is not unique
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json(category);
});
