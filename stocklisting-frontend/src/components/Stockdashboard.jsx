import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const StockDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [selectedCountry, setSelectedCountry] = useState('uk');
  const [stocks, setStocks] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToWishlist = async (stock) => {
    console.log(stock, 'wishliststock');
    try {
      const userId = user._id;

      // Extracting all fields from the selected stock row
      const { symbol, name, currency, exchange, mic_code, country, type } = stock;

      const response = await api.post('http://localhost:9000/api/wishlist', {
        userId,
        ...{
          symbol,
          name,
          currency,
          exchange,
          mic_code,
          country,
          type,
        },
      });

      if (response.status === 201) {
        setSuccessMessage('Stock added to wishlist successfully!');
        setSnackbarOpen(true);

        // Clearing the success message after a certain duration (e.g., 3 seconds)
        setTimeout(() => {
          setSuccessMessage('');
          setSnackbarOpen(false);
        }, 3000);
      } else {
        console.error('Failed to add stock to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

   // Function to get the authentication token from local storage
   const getToken = () => {
    return localStorage.getItem('token');
  };
 
  const fetchStocksByCountry = async () => {
    try {
      const response = await api.get(`/api/stocks/${selectedCountry}`);

      if (response.status !== 200) {
        throw new Error(`Failed to fetch stocks for ${selectedCountry}: ${response.statusText}`);
      }

      const stocksData = response.data.stocks;
      setStocks(stocksData);
    } catch (error) {
      console.error(`Failed to fetch stocks for ${selectedCountry}`, error);
    }
  };
  useEffect(() => {
    if (successMessage) {
      const timeoutId = setTimeout(() => {
        setSuccessMessage('');
        setSnackbarOpen(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [successMessage]);
  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to the login page if not authenticated
      navigate('/login');
    } else {
      // Fetch stocks only if authenticated
      fetchStocksByCountry();
    }
  }, [selectedCountry]);
 

  const renderTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Country</th>
            <th>Currency</th>
            <th>Exchange</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.name}</td>
              <td>{stock.symbol}</td>
              <td>{stock.country}</td>
              <td>{stock.currency}</td>
              <td>{stock.exchange}</td>
              <td>{stock.type}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToWishlist(stock)}
                >
                  Add to Wishlist
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div className="container mt-3">
        <h2>Stock Dashboard</h2>

        <div className="mb-3">
          <label htmlFor="countrySelect" className="form-label">
            Select Country
          </label>
          <select
            id="countrySelect"
            className="form-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="uk">UK</option>
            <option value="ireland">Ireland</option>
            <option value="france">France</option>
            <option value="finland">Finland</option>
          </select>
        </div>

        <div className="card p-3">
          <h3>Stocks for {selectedCountry.toUpperCase()}</h3>
          {stocks ? renderTable() : <p>Loading stocks...</p>}
        </div>

        {/* Snackbar for success messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
            {successMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

export default StockDashboard;
