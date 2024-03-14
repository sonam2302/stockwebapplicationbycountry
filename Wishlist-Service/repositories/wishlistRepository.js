const WishlistItem = require("../models/WishlistItem");

const addToWishlist = async (
  stockId,
  symbol,
  name,
  currency,
  exchange,
  mic_code,
  country,
  type
) => {
  try {
    return await WishlistItem.create({
      stockId,
      symbol,
      name,
      currency,
      exchange,
      mic_code,
      country,
      type,
    });
  } catch (error) {
    throw error;
  }
};

const getWishlistItems = async () => {
  try {
    return await WishlistItem.find({});
  } catch (error) {
    throw error;
  }
};

const removeFromWishlist = async (stockId) => {
  try {
    return await WishlistItem.deleteOne({ stockId });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
};
