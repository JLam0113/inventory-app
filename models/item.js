const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  category: { type: Schema.ObjectId, ref: "Category" },
  description: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
  quantity: { type: Number, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("Item", ItemSchema);
