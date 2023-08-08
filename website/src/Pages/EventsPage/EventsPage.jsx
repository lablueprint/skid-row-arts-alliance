import { React, useEffect, useState } from 'react';
import {
  Box, Button, Container, Typography, Modal,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import EventCard from './EventCard';

const isoWeek = require('dayjs/plugin/isoWeek');
const isBetween = require('dayjs/plugin/isBetween');

dayjs.extend(isoWeek);
dayjs.extend(isBetween);

function EventsPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);
  const navigate = useNavigate();

  const [allEvents, setAllEvents] = useState([]);
  const [dateRange, setDateRange] = useState({});
  const [eventsInRange, setEventsInRange] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);
  const [previewDetails, setPreviewDetails] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const sortEvents = (eventA, eventB) => {
    if (eventA.dateDetails.date < eventB.dateDetails.date) {
      return -1;
    } if (eventA.date > eventB.date) {
      return 1;
    }
    const timeA = new Date(`2000-01-01 ${eventA.dateDetails.startTime}`);
    const timeB = new Date(`2000-01-01 ${eventB.startTime}`);

    if (timeA < timeB) {
      return -1;
    } if (timeA > timeB) {
      return 1;
    }
    return 0;
  };

  const identifyEventsInRange = async (week, diff, events) => {
    const monday = week.isoWeekday(0);
    const sunday = week.isoWeekday(6);

    const newDateRange = {
      mondayMonth: monday.format('MMMM'),
      monday: monday.format('DD'),
      sundayMonth: sunday.format('MMMM'),
      sunday: sunday.format('DD'),
      diff,
    };
    setDateRange(newDateRange);

    const initialEvents = [];
    events.forEach((event) => {
      const dateObject = dayjs(event.dateDetails.date, 'YYYY-MM-DD');
      if (event.dateDetails.recurring === 'Does not repeat'
      && dateObject.isBetween(monday, sunday, null, '[]')) {
        initialEvents.push(event);
      } else if (event.dateDetails.recurring === 'Weekly') {
        const weeklyEvent = { ...event };
        weeklyEvent.dateDetails.date = week.isoWeekday(event.dateDetails.day)
          .format('YYYY-MM-DD').slice(0, 10);
        initialEvents.push(weeklyEvent);
      } else {
        const weekOfMonth = week.isoWeek() - week.startOf('month').isoWeek() + 1;
        if (weekOfMonth === event.dateDetails.week) {
          const monthlyEvent = { ...event };
          monthlyEvent.dateDetails.date = week.isoWeekday(event.dateDetails.day)
            .format('YYYY-MM-DD').slice(0, 10);
          initialEvents.push(monthlyEvent);
        }
      }
    });
    initialEvents.sort(sortEvents);
    return initialEvents;
  };

  const getEvents = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/event/getevents`, {
      headers: authHeader,
    });
    const events = response.data;
    setAllEvents(events);

    const initialEvents = await identifyEventsInRange(dayjs(), 0, events);
    setEventsInRange(initialEvents);
  };

  useEffect(() => {
    getEvents();
  }, [refresh]);

  const updateWeek = async (newDiff) => {
    const newWeek = dayjs().add(newDiff, 'week');
    const updatedEvents = await identifyEventsInRange(newWeek, newDiff, allEvents);
    setEventsInRange(updatedEvents);
  };

  const addNewEvent = () => {
    navigate('/events/add');
  };

  const editEventDetails = (id) => {
    const eventDetails = allEvents.find((e) => e._id === id);
    navigate('/events/edit', {
      state: {
        eventDetails,
      },
    });
  };

  const deleteEvent = async (eventId) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/event/delete/${eventId}`, {
      headers: authHeader,
    });
    setOpenPreview(false);
    setRefresh((val) => val + 1);
  };

  const previewEventDetails = (eventDetails) => {
    setOpenPreview(true);
    setPreviewDetails(eventDetails);
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
        {eventsInRange.map((event) => (
          <Box
            key={event._id}
            onClick={() => previewEventDetails(event)}
          >
            <EventCard
              recurring={event.dateDetails.recurring}
              day={event.dateDetails.day}
              date={event.dateDetails.date}
              startTime={event.dateDetails.startTime}
              endTime={event.dateDetails.endTime}
              title={event.title}
              host={event.host}
              tag={event.tag}
            />
          </Box>
        ))}
      </Box>
      <Modal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
      >
        { previewDetails !== null ? (
          <Box sx={{
            position: 'relative',
            top: '50%',
            left: '50%',
            width: 600,
            height: 500,
            backgroundColor: 'white',
          }}
          >
            <Box>
              <Button onClick={() => editEventDetails(previewDetails._id)}>Edit</Button>
              <Button onClick={() => deleteEvent(previewDetails._id)}>Delete</Button>
              <Button onClick={() => setOpenPreview(false)}>Close</Button>
            </Box>
            <Box>
              <Typography>
                {previewDetails.title}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography>
                {previewDetails.host}
              </Typography>
              <Typography>
                {previewDetails.tag}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography>
                {dayjs(previewDetails.dateDetails.date).toString().slice(0, 11)}
              </Typography>
              <Typography>
                {previewDetails.dateDetails.startTime}
                -
                {previewDetails.dateDetails.endTime}
              </Typography>
            </Box>
            <Box>
              <Typography>
                {previewDetails.locationDetails.address}
              </Typography>
            </Box>
            <Box>
              <Typography>
                {previewDetails.description}
              </Typography>
            </Box>
          </Box>
        ) : (
          <>
          </>
        )}
      </Modal>
    </Container>
  );
}

export default EventsPage;
