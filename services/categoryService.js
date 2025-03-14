const { CategoryModel } = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  const name = req.body.name;

  const newCategory = new CategoryModel({ name });

  newCategory.slug = newCategory.name.replace(" ", "-").toLowerCase();

  await newCategory
    .save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.getCategories = async (req, res) => {
  await CategoryModel.find()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
