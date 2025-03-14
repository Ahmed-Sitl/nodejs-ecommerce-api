const mongoose = require("mongoose");

// create category model
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [30, "Name must be at most 30 characters"],
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
      lowercase: true,
      unique: [true, "Slug must be unique"],
      minLength: [3, "Slug must be at least 3 characters"],
      maxLength: [30, "Slug must be at most 30 characters"],
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = { CategoryModel };
