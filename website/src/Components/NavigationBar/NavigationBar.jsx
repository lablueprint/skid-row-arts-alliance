import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { logout } from '../../redux/sliceAuth';
import './NavigationBar.css';
import '../../fonts/Montserrat.css';

function NavigationBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [activePage, setActivePage] = useState('');

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const handleSignOut = async () => {
    dispatch(logout());
  };

  const isPageActive = (path) => (activePage === path ? 'active' : '');

  return (
    <div className="NavBar">
      <li className={isPageActive('/')}>
        <Link to="/" className={`nav-link ${isPageActive('/')}`}>
          Gallery
        </Link>
      </li>
      <li className={isPageActive('/zines')}>
        <Link to="/zines" className={`nav-link ${isPageActive('/zines')}`}>
          Zines
        </Link>
      </li>
      <li className={isPageActive('/events')}>
        <Link to="/events" className={`nav-link ${isPageActive('/events')}`}>
          Events
        </Link>
      </li>
      <li className={isPageActive('/resources')}>
        <Link to="/resources" className={`nav-link ${isPageActive('/resources')}`}>
          Resources
        </Link>
      </li>
      <li className={isPageActive('/nonprofits')}>
        <Link to="/nonprofits" className={`nav-link ${isPageActive('/nonprofits')}`}>
          NPO Partners
        </Link>
      </li>
      <Button
        variant="outlined"
        className="sign-out-button"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );
}

export default NavigationBar;
