import React from 'react';
import stockMarketImage from '../assets/stock.jpg';
import './Layout.css'; 

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <div className="background-image"></div>
      <div className="content-container">{children}</div>
    </div>
  );
};

export default Layout;
