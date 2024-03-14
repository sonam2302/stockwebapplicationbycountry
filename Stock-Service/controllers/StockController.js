const StockService = require("../services/StockService");

const listStocksByCountry = async (req, res) => {
  const { country } = req.params;

  try {
    const stocks = await StockService.fetchStocksByCountry(country);
    res.send({ stocks });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { listStocksByCountry };
