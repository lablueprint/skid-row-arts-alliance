import { React } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

// TODO: finish edit details page

function EventDetailsPage() {
  const location = useLocation();
  const {
    id,
  } = location.state;

  return (
    <Container>
      <Box>
        <Typography variant="h5">Edit Event Info</Typography>
        <Typography>{id}</Typography>
      </Box>
    </Container>
  );
}

export default EventDetailsPage;
