const Item = require("../models/item");
const ObjectId = require('mongoose').Types.ObjectId;
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({ "category": new ObjectId(req.params.id) }).exec();
  console.log(allItems);
  res.render("item_list", {
    title: "Items",
    items: allItems,
  });
});

exports.display = asyncHandler(async (req, res, next) => {
  const itemQuery = await Item.find({ "_id": new ObjectId(req.params.id) }).exec();
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render("item", {
    title: itemQuery[0].name,
    item: itemQuery[0],
    categories: allCategories,
  });
});

exports.update = asyncHandler(async (req, res, next) => {
  console.log(req);
  res.redirect('back');
});