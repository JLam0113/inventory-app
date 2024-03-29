const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");


// Get all categories
router.get("/", category_controller.index);

// Get all items in the category
router.get("/category/:id", item_controller.display);


module.exports = router;