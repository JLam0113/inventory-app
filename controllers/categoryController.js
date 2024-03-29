const Category = require("../models/category");
const ObjectId = require('mongoose').Types.ObjectId;

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  console.log(allCategories);
  res.render("category_list", {
    title: "Category List",
    categories: allCategories,
  });
});

exports.create = [
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "description must be specified").trim().isLength({ min: 1 }).escape(),
  body("url", "url must be specified").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      url: decodeURIComponent(req.body.url),
    });

    if (!errors.isEmpty()) {
      console.log("error")
      res.redirect('back');
      return;
    }
    else {
      await category.save();
      res.redirect('back');
    }
  }),];