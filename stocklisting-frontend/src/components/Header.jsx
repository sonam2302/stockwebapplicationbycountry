import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';
// import FavoriteIcon from '@mui/material/Favorite';
const Header = ({ user, onLogout }) => {
  const wishlistLinkStyle = {
    color: 'azure',
    textDecoration: 'none', // Remove underline from the link
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyle = {
    color: 'azure',
    marginRight: '8px', 
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Calling the onLogout function passed from the parent component
    navigate('/login'); // Use navigate to redirect to the home page
  };
  return (
    <header className="bg-secondary p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <Link to="/" className="text-decoration-none">
            <h1 style={{color:"azure"}}>Stock App</h1>
          </Link>
        </div>
        <div className="d-flex align-items-center">
          {user && user.username ? (
            <div className="d-flex align-items-center">
              <span className="me-3" style={{color:"azure"}}>Welcome, {user.username}!</span>
              <button className="btn btn-primary me-3" onClick={handleLogout}>
                Logout
              </button>
              <Link to="/view-wishlist" style={wishlistLinkStyle}>
       
        <span style={{ color: 'azure' }}>View Wishlist</span>
        <Favorite style={iconStyle} /> {/* Material-UI heart icon */}
      </Link>
            </div>
            
          ) : (
            <div>
              <Link to="/login" className="btn btn-primary me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
