import { React } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function NonprofitCard({
  organizationTitle, email, phoneNumber, website,
}) {
  return (
    <Box sx={{ display: 'flex', border: 1 }}>
      <Box>
        <Typography>
          {organizationTitle}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {email}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {phoneNumber}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {website}
        </Typography>
      </Box>
    </Box>
  );
}

NonprofitCard.propTypes = {
  organizationTitle: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
};

export default NonprofitCard;
