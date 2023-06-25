import { React, useEffect, useState } from 'react';
import {
  Box, Button, Container, Typography,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import EventCard from './EventCard';

const isoWeek = require('dayjs/plugin/isoWeek');
const weekday = require('dayjs/plugin/weekday');

dayjs.extend(isoWeek);
dayjs.extend(weekday);

function EventsPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [dateRange, setDateRange] = useState({
    mondayMonth: dayjs().format('MMMM'),
    monday: dayjs().isoWeekday(0).format('DD'),
    sundayMonth: dayjs().format('MMMM'),
    sunday: dayjs().isoWeekday(6).format('DD'),
    diff: 0,
  });

  const getEvents = async () => {
    const allEvents = await axios.get('http://localhost:4000/event/getevents', {
      headers: authHeader,
    });
    setEvents(allEvents.data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const updateWeek = (newDiff) => {
    const newWeek = dayjs().add(newDiff, 'week');
    const newDateRange = {
      mondayMonth: newWeek.isoWeekday(0).format('MMMM'),
      monday: newWeek.isoWeekday(0).format('DD'),
      sundayMonth: newWeek.isoWeekday(6).format('MMMM'),
      sunday: newWeek.isoWeekday(6).format('DD'),
      diff: newDiff,
    };
    setDateRange(newDateRange);
  };

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
          <Button onClick={() => updateWeek(dateRange.diff - 1)}>Back</Button>
          <Box>
            { dateRange.mondayMonth === dateRange.sundayMonth ? (
              <Typography>
                {dateRange.mondayMonth}
                {' '}
                {dateRange.monday}
                -
                {dateRange.sunday}
              </Typography>
            ) : (
              <Typography>
                {dateRange.mondayMonth}
                {' '}
                {dateRange.monday}
                -
                {dateRange.sundayMonth}
                {' '}
                {dateRange.sunday}
              </Typography>
            )}
          </Box>
          <Button onClick={() => updateWeek(dateRange.diff + 1)}>Next</Button>
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
