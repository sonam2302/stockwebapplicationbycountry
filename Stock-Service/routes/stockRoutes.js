const express = require('express');
const router = express.Router();
const StockController = require('../controllers/StockController');

router.get('/stocks/:country', StockController.listStocksByCountry);

module.exports = router;
