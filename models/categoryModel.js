const mongoose = require("mongoose");

// create category model
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category name must be unique"],
      minLength: [3, "Category name must be at least 3 characters"],
      maxLength: [30, "Category name must be at most 30 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = { CategoryModel };
