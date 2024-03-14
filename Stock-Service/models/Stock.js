const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema(
  {
    symbol:String,
    name:String,
    currency: String,
    exchange: String,
    mic_code: String,
    country:String,
    type: String
   },
  { strict: true } // Enforce strict schema
);

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
