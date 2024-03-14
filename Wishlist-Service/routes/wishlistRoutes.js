const express = require("express");
const wishlistController = require("../controllers/wishlistController");

const router = express.Router();

router.post("/wishlist", wishlistController.addToWishlist);
router.get("/wishlists", wishlistController.getWishlistItems);
router.delete("/wishlist/:stockId", wishlistController.removeFromWishlist);
module.exports = router;
