import React from 'react';
import stockMarketImage from '../assets/stock.jpg';  // Update the image import path

const Home = ({ user }) => {
  return (
    <div className="container mt-4">
    
      {user ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <p>This is the main content of your stock app.</p>
        </div>
      ) : (
        <div>
          <h2>Stock App</h2>
          <p>This is a simple stock app. Please login or register to explore.</p>
        </div>
      )}
        <div style={{ textAlign: 'center' }}>
        <img
          src={stockMarketImage}
          alt="Stock Market"
          style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
        />
      </div>
    </div>
  );
};

export default Home;
