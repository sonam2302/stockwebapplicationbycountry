const express = require('express');
const mongoose = require('mongoose');
const wishlistRoutes = require('./routes/wishlistRoutes');
const ConsulConfiguration = require("./consul-config.js");
const cors = require('cors')

const app = express();
ConsulConfiguration(app);
app.use(cors())

app.use(express.json());
app.use('/api', wishlistRoutes);

mongoose.connect('mongodb://localhost:27017/StocksDB');

app.listen(process.env.HOST_PORT, () => {
  console.log(`Server running on port ${process.env.HOST_PORT}`);
});