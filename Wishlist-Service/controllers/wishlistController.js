const wishlistService = require('../services/wishlistService');
const { v4: uuidv4 } = require('uuid');
const addToWishlist = async (req, res) => {

  const stockId = uuidv4(); // Generate a UUID for the wishlist item
  const { symbol, name, currency,exchange,mic_code,country,type } = req.body;


  try {
    const newItem = await wishlistService.addToWishlist( stockId,symbol, name, currency,exchange,mic_code,country,type);

    res.status(201).send(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getWishlistItems = async (req, res) => {

  try {
    const wishlistItems = await wishlistService.getWishlistItems();
    res.send(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};


const removeFromWishlist = async (req, res) => {
  const { stockId } = req.params;

  try {
    await wishlistService.removeFromWishlist(stockId);
    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
};
