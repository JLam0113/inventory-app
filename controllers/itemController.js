const Item = require("../models/item");
const ObjectId = require('mongoose').Types.ObjectId;
const Category = require("../models/category");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({ "category": new ObjectId(req.params.id) }).exec();
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  console.log(allItems);
  res.render("item_list", {
    title: "Items",
    items: allItems,
    categories: allCategories,
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

exports.update = [
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "description must be specified").trim().isLength({ min: 1 }).escape(),
  body("category", "category must be specified").trim().isLength({ min: 1 }).escape(),
  body("price", "price must be specified").trim().optional({ checkFalsy: true }).isNumeric().withMessage('Only Decimals allowed'),
  body("quantity", "quantity must be specified").trim().isInt({ min: 0 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: new ObjectId(req.body.category),
      price: parseFloat(req.body.price),
      quantity: parseInt(req.body.quantity),
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render the form again, passing sanitized values and errors.
      console.log("error")
      res.redirect('back');
      return;
    }
    else {
      await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect('back');
    }
  }),];

exports.create = [
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "description must be specified").trim().isLength({ min: 1 }).escape(),
  body("category", "category must be specified").trim().isLength({ min: 1 }).escape(),
  body("price", "price must be specified").trim().optional({ checkFalsy: true }).isNumeric().withMessage('Only Decimals allowed'),
  body("quantity", "quantity must be specified").trim().isInt({ min: 0 }),
  body("url", "url must be specified").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: new ObjectId(req.body.category),
      price: parseFloat(req.body.price),
      quantity: parseInt(req.body.quantity),
      url: decodeURIComponent(req.body.url),
      _id: req.params.id,
    });
    console.log(req.body)

    if (!errors.isEmpty()) {
      // There are errors.
      // Render the form again, passing sanitized values and errors.
      console.log("error")
      res.redirect('back');
      return;
    }
    else {
      await item.save();
      res.redirect('back');
    }
  }),];