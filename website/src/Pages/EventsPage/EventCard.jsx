import { Box, Typography } from '@mui/material';
import { React } from 'react';

function EventCard() {
  return (
    <Box>
      <Box>
        <Typography>Date</Typography>
        <Typography>Date</Typography>
      </Box>
      <Box>
        <Typography>Time</Typography>
      </Box>
      <Box>
        <Typography>Event Tile</Typography>
      </Box>
      <Box>
        <Typography>Nonprofit</Typography>
      </Box>
      <Box>
        <Typography>Frequency</Typography>
      </Box>
      <Box>
        <Typography>Tag</Typography>
      </Box>
    </Box>
  );
}

export default EventCard;
