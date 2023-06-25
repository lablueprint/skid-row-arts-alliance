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
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);

function EventsPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);
  const navigate = useNavigate();

  const [allEvents, setAllEvents] = useState([]);
  const [dateRange, setDateRange] = useState({
    mondayMonth: dayjs().isoWeekday(0).format('MMMM'),
    monday: dayjs().isoWeekday(0).format('DD'),
    sundayMonth: dayjs().isoWeekday(6).format('MMMM'),
    sunday: dayjs().isoWeekday(6).format('DD'),
    diff: 0,
  });
  // const [eventsInRange, setEventsInRange] = useState([]);

  const getEvents = async () => {
    const events = await axios.get('http://localhost:4000/event/getevents', {
      headers: authHeader,
    });
    setAllEvents(events.data);
    // const currRange = dayjs();

    // // TODO: handle cases
    // // if occurs once, check if date in range
    // // if monthly, check if the week aligns
    // const showEvents = events.data.forEach((event) => {
    //   event.date.isSameOrAfter(dayjs().isoWeekday(0)) &&
    // inputDate.isSameOrBefore(dayjs().isoWeekday(6));
    // })
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
        {allEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            recurring={event.dateDetails.recurring}
            day={event.dateDetails.day}
            date={event.dateDetails.date}
            startTime={event.dateDetails.startTime}
            endTime={event.dateDetails.endTime}
            title={event.title}
            host={event.host}
            tag={event.tag}
          />
        ))}
      </Box>
    </Container>
  );
}

export default EventsPage;
