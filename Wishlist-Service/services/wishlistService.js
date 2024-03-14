// services/wishlistService.js

const wishlistRepository = require("../repositories/wishlistRepository");

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
  return wishlistRepository.addToWishlist(
    stockId,
    symbol,
    name,
    currency,
    exchange,
    mic_code,
    country,
    type
  );
};

const getWishlistItems = async () => {
  return wishlistRepository.getWishlistItems();
};

const removeFromWishlist = async (stockId) => {
  return wishlistRepository.removeFromWishlist(stockId);
};
module.exports = {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
};
