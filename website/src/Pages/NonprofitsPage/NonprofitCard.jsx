import { React } from 'react';
import {
  Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

function NonprofitCard({ image, title }) {
  return (
    <Box>
      <Box>
        { image ? (
          <img src={image} alt="Nonprofit" />
        ) : (
          null
        )}
      </Box>
      <Box>
        <Typography>{title}</Typography>
      </Box>
    </Box>
  );
}

NonprofitCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default NonprofitCard;
