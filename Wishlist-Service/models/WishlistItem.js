const mongoose = require("mongoose");

const WishlistItemSchema = new mongoose.Schema({
  stockId: String,
  symbol: String,
  name: String,
  currency: String,
  exchange: String,
  mic_code: String,
  country: String,
  type: String,
});

const WishlistItem = mongoose.model("WishlistItem", WishlistItemSchema);

module.exports = WishlistItem;
