const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

router.get('/', function (req, res, next) {
    res.render('index');
  });

// Get all categories
router.get("/category", category_controller.index);

// Get all items in the category
router.get("/category/:id", item_controller.index);

// Get all categories
router.post("/category/create", category_controller.create);

// Get item details
router.get("/item/:id", item_controller.display);

// Update item
router.post("/item/:id/update", item_controller.update);

// Create item
router.post("/item/create", item_controller.create);

module.exports = router;