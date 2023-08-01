import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function EventImageCard({ image, index, removeImage }) {
  return (
    <Box sx={{ display: 'flex', backgroundColor: 'black' }}>
      <img src={image} alt={`Uploaded ${index}`} width="100" height="100" />
      <Button onClick={() => removeImage(index)}>x</Button>
    </Box>
  );
}

EventImageCard.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  removeImage: PropTypes.func.isRequired,
};

export default EventImageCard;
