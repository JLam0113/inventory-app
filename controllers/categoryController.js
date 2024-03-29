const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().sort({ name: 1 }).exec();
    console.log(allCategories);
    res.render("category_list", {
      title: "Category List",
      index: allCategories,
    });
  });