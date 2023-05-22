import { React } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './NavigationBar.css';
import { Box, Button } from '@mui/material';
import { logout } from '../../redux/sliceAuth';

function NavigationBar() {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    dispatch(logout());
  };

  return (
    <Box className="NavBar" sx={{ padingLeft: '5' }}>
      <Box>
        <Link to="/">Gallery</Link>
      </Box>
      <Box>
        <Link to="zines">Zines</Link>
      </Box>
      <Box>
        <Link to="events">Events</Link>
      </Box>
      <Box>
        <Link to="resources">Resources</Link>
      </Box>
      <Button variant="outlined" onClick={() => { handleSignOut(); }}>Sign Out</Button>
    </Box>
  );
}

export default NavigationBar;
