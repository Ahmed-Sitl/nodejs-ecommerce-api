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

// @desc Get a specific category
// @route GET /api/v1/categories/:id
// @access Public
// @param {string} id - The ID of the category
// @returns {object} The category object
// @throws {Error} If the category is not found
exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(category);
});

// @docs Update specific category
// @route PATCH /api/v1/categories/:id
// @access Private
// @param {string} id - The id of the category
// @body {object} The update category
// @returns {object} The updated category
// @throws {Error} If the category is not found
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const name = body.name;
  const category = await CategoryModel.findByIdAndUpdate(
    id,
    { ...body, slug: slugify(name) },
    {
      new: true,
    }
  );
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(category);
});

// @desc Create new category
// @route POST /api/v1/categories
// @access Private
// @body {string} name - The name of the category
// @returns {object} The created category
// @throws {Error} If the category name is not provided
// @throws {Error} If the category name is not unique
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json(category);
});

// @docs Delete a category
// @route DELETE /api/v1/categories/:id
// @access Private
// @param {string} id - The id of the category to be deleted
// @returns {String} The message of deleted category
// @throws {Error} If the category is not found
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  // res.status(204).json({ message: "Category deleted successfully" });
  res.status(200).send({ message: "Category deleted successfully" });
});
