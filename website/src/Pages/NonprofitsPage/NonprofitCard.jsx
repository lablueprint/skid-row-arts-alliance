import { React } from 'react';
import {
  Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

function NonprofitCard({ image, title }) {
  return (
    <Box>
      <Box>
        <img style={{ height: 75, width: 75 }} src={image} alt="Nonprofit" />
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
