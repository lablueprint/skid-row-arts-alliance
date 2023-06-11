import { React, useEffect } from 'react';
import {
  Box, Button, Container, Typography,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

function EventsPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);

  const getEvents = async () => {
    const allEvents = await axios.get('http://localhost:4000/event/getevents', {
      headers: authHeader,
    });
    console.log(allEvents);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Container>
      <Box>
        <Typography variant="h5">Events</Typography>
      </Box>
      <Box>
        <Box>
          <Button>Back</Button>
          <Typography>June 10</Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default EventsPage;
