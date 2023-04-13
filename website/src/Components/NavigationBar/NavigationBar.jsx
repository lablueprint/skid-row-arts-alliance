import { React } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './NavigationBar.css';
import { Button } from '@mui/material';
import { logout } from '../../redux/sliceAuth';

function NavigationBar() {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    dispatch(logout());
  };

  return (
    <div className="NavBar">
      <li>
        <Link to="/">Gallery</Link>
      </li>
      <li>
        <Link to="zines">Zines</Link>
      </li>
      <li>
        <Link to="events">Events</Link>
      </li>
      <li>
        <Link to="resources">Resources</Link>
      </li>
      <Button variant="outlined" onClick={() => { handleSignOut(); }}>Sign Out</Button>
    </div>
  );
}

export default NavigationBar;
