const axios = require('axios');
const StockRepository = require('../repositories/StockRepository');

const fetchStocksByCountry = async (country) => {
  try {
    // Trying to fetch from the database
    const stocksFromDb = await StockRepository.getAllStocksByCountry(country);
console.log(stocksFromDb,'stocksFromDb')
    if (stocksFromDb.length > 0) {
      return stocksFromDb;
    }

    const apiKey = "aace904db2f54323a27b6707f5be1845";
    const apiUrl = `https://api.twelvedata.com/stocks?country=${country}&apiKey=${apiKey}`;

    const response = await axios.get(apiUrl);

    const responseData = response.data.data;

    if (!responseData) {
      throw new Error("There is no data.");
    }

    // Saving the fetched stocks to the database
    await Promise.all(responseData.map(async (stock) => {
      console.log(stock,'stock')
      try {
        // Check if the 'name' field is available in the stock data
        if (!stock.name) {
          throw new Error("Stock data is missing the 'name' field.");
        }

        // Save only the required fields to the database
        const stockToSave = {
          symbol: stock.symbol,
          name: stock.name,
          currency:stock.currency,
          exchange:stock.exchange,
          mic_code:stock.mic_code,
          country: stock.country,
          type: stock.type
        };


        // Save each stock to the database
        await StockRepository.saveStock(stockToSave);
      } catch (saveError) {
        // Handle the specific validation error for the "name" field
        if (saveError.name === 'ValidationError' && saveError.errors.name) {
          throw new Error(`Error saving stock to database: ${saveError.errors.name.message}`);
        } else {
          throw new Error(`Error saving stock to database: ${saveError.message}`);
        }
      }
    }));
    console.log(responseData,'responseData');

    return responseData; // Return the entire 'data' array
  } catch (error) {
    throw new Error(`Error fetching and saving stocks for ${country}: ${error.message}`);
  }
};

module.exports = { fetchStocksByCountry };

