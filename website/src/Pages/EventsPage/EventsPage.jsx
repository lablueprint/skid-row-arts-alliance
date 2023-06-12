import { React, useEffect, useState } from 'react';
import {
  Box, Button, Container, Typography,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// TODO: come back to this after add event works
// import EventCard from './EventCard';

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
    console.log(events);
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
      {/* <Box>
        {events.map((event) => (
          <EventCard
            id={event.id}
            day={event.dateDetails.day}
            date={event.dateDetails.date}
            startTime={event.startTime}
            endTime={event.endTime}
            title={event.title}
            nonprofits={event.nonprofits}
            recurring={event.recurring}
            tag={event.tag}
          />
        ))}
      </Box> */}
    </Container>
  );
}

export default EventsPage;
