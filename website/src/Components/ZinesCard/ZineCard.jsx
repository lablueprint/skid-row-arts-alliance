import { Button, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { React } from 'react';

function ZineCard({
  id, title, season, year, url,
}) {
  const handleEditZineDetails = async () => {
    console.log(id);
  };

  const handleDeleteZineDetails = async () => {
    console.log(url);
  };
  return (
    <Box style={{ background: 'gray', margin: '10px' }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">
        {season}
        {' '}
        {year}
      </Typography>
      <Button variant="contained" onClick={() => handleEditZineDetails()}>Edit</Button>
      <Button variant="contained" onClick={() => handleDeleteZineDetails()}>Delete</Button>
    </Box>
  );
}

ZineCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ZineCard;
