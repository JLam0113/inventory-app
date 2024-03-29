const Item = require("../models/item");
const ObjectId = require('mongoose').Types.ObjectId; 


const asyncHandler = require("express-async-handler");

exports.display = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find({ "category" : new ObjectId(req.params.id)}).exec();
    console.log(allItems);
    res.render("item_list", {
      title: "Items",
      items: allItems,
    });
  });