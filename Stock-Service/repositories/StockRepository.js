const Stock = require('../models/Stock');

const getAllStocksByCountry = async (country) => {
  return await Stock.find({ country });
};


const saveStock = async (stockData) => {
    // console.log(stockData,'saveddstockData')
  const stock = new Stock(stockData);
//   console.log(stock,'stock')
  return await stock.save();
};

module.exports = { getAllStocksByCountry, saveStock };
