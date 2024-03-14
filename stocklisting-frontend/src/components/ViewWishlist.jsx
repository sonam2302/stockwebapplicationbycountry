import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ViewWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
 // Function to get the authentication token from local storage
 const getToken = () => {
  return localStorage.getItem('token');
};


useEffect(() => {
  // Check if the user is authenticated
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to the login page if not authenticated
    navigate('/login');
  } else {
    // Fetch wishlist items only if authenticated
    const fetchWishlistItems = async () => {
      try {
        const response = await api.get('http://localhost:9000/api/wishlists');
        setWishlistItems(response.data || []);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };

    fetchWishlistItems();
  }
}, []);
 

  const handleDelete = async (stockId) => {
    try {
      await api.delete(`http://localhost:9000/api/wishlist/${stockId}`);
      setWishlistItems((prevItems) => prevItems.filter((item) => item.stockId !== stockId));

      setSuccessMessage('Item deleted from wishlist successfully!');
      setSnackbarOpen(true);

      // Clear the success message after a certain duration (e.g., 3 seconds)
      setTimeout(() => {
        setSuccessMessage('');
        setSnackbarOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGoBack = () => {
    navigate('/stock-dashboard'); 
  };

  return (
    <div>
      <h2>Wishlist</h2>
      <button onClick={handleGoBack}>Go Back to Dashboard</button>
      {wishlistItems.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Exchange</th>
              <th>Currency</th>
              <th>Mic_Code</th>
              <th>Type</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.symbol}</td>
                <td>{item.exchange}</td>
                <td>{item.currency}</td>
                <td>{item.mic_code}</td>
                <td>{item.type}</td>
                <td>{item.country}</td>
                <td>
                  <button onClick={() => handleDelete(item.stockId)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in the wishlist</p>
      )}

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
  );
};

export default ViewWishlist;
