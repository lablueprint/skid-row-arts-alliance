import { React, useEffect, useState } from 'react';
import {
  Box, Button, Container, Typography,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';

function EventsPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const allEvents = await axios.get('http://localhost:4000/event/getevents', {
      headers: authHeader,
    });
    setEvents(allEvents.data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const addNewEvent = () => {
    navigate('/events/add');
  };

  return (
    <Container>
      <Box>
        <Typography variant="h5">Events</Typography>
      </Box>
      <Box>
        <Box>
          <Button>Back</Button>
          <Typography>June 10</Typography>
          <Button>Next</Button>
        </Box>
        <Box>
          <Button
            onClick={() => addNewEvent()}
          >
            Add New +
          </Button>
        </Box>
      </Box>
      <Box>
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            recurring={event.dateDetails.recurring}
            date={event.dateDetails.date}
            day={event.dateDetails.day}
            week={event.dateDetails.week}
            startTime={event.dateDetails.startTime}
            endTime={event.dateDetails.endTime}
            title={event.title}
            nonprofits={event.nonprofits}
            tag={event.tag}
          />
        ))}
      </Box>
    </Container>
  );
}

export default EventsPage;
