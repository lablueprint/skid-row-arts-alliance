import { React, useEffect, useState } from 'react';
import {
  Box, Button, Container, FormControl, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import axios from 'axios';

function EditResourcePage() {
  const location = useLocation();
  const {
    eventDetails,
  } = location.state;

  const { authHeader } = useSelector((state) => state.sliceAuth);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [host, setHost] = useState('');
  const [tag, setTag] = useState('');
  const [date, setDate] = useState(dayjs());
  const [recurrence, setRecurrence] = useState('');
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(1, 'h'));
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(eventDetails.title);
    setHost(eventDetails.host);
    setTag(eventDetails.tag);
    setDate(dayjs(eventDetails.dateDetails.date));
    setRecurrence(eventDetails.dateDetails.recurring);
    setStartTime(dayjs(eventDetails.dateDetails.startTime, 'h:mm a'));
    setEndTime(dayjs(eventDetails.dateDetails.endTime, 'h:mm a'));
    setLatitude(eventDetails.locationDetails.coordinates.latitude);
    setLongitude(eventDetails.locationDetails.coordinates.longitude);
    setAddress(eventDetails.locationDetails.address);
    setDescription(eventDetails.description);
  }, []);

  const backToEvents = () => {
    navigate('/events');
  };

  const editEvent = async () => {
    const week = date.week() - date.startOf('month').week() + 1;
    const dateDetails = {
      recurring: recurrence,
      date: dayjs(date).format('YYYY-MM-DD'),
      day: date.day(),
      week,
      startTime: startTime.format('h:mm a'),
      endTime: endTime.format('h:mm a'),
    };
    const locationDetails = {
      address,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    };
    const updatedEvent = {
      title,
      dateDetails,
      locationDetails,
      host,
      description,
      tag,
    };
    await axios.patch(`http://localhost:4000/event/update/${eventDetails._id}`, updatedEvent, {
      headers: authHeader,
    });
    backToEvents();
  };

  return (
    <Container>
      <Box>
        <Typography variant="h5">Edit Event Info</Typography>
      </Box>
      <Box>
        <Typography>Event Title</Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box>
        <Box>
          <Typography>Host</Typography>
          <FormControl fullWidth>
            <Select
              value={host}
              onChange={(e) => {
                setHost(e.target.value);
              }}
            >
              <MenuItem value="Los Angeles Poverty Department">Los Angeles Poverty Department</MenuItem>
              <MenuItem value="Piece by Piece">Piece by Piece</MenuItem>
              <MenuItem value="Street Symphony">Street Symphony</MenuItem>
              <MenuItem value="Urban Voices Project">Urban Voices Project</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Typography>Tag</Typography>
          <FormControl fullWidth>
            <Select
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
              }}
            >
              <MenuItem value="visual art">visual art</MenuItem>
              <MenuItem value="film">film</MenuItem>
              <MenuItem value="music">music</MenuItem>
              <MenuItem value="art-related community event">art-related community event</MenuItem>
              <MenuItem value="performance / theater">performance / theater</MenuItem>
              <MenuItem value="spoken word">spoken word</MenuItem>
              <MenuItem value="miscellaneous">miscellaneous</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography>Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <Typography>Recurrence</Typography>
          <FormControl fullWidth>
            <Select
              value={recurrence}
              onChange={(e) => {
                setRecurrence(e.target.value);
              }}
            >
              <MenuItem value="Does not repeat">Does not repeat</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box>
        <Typography>Time</Typography>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={startTime}
              onChange={(newTime) => setStartTime(newTime)}
            />
          </LocalizationProvider>
        </Box>
        <Typography>to</Typography>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={endTime}
              onChange={(newTime) => setEndTime(newTime)}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography>Latitude</Typography>
          <TextField
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </Box>
        <Box>
          <Typography>Longitude</Typography>
          <TextField
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </Box>
      </Box>
      <Box>
        <Typography>Address</Typography>
        <TextField
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Box>
      <Box>
        <Typography>Description</Typography>
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <Box>
        <Button onClick={() => backToEvents()}>Cancel</Button>
        <Button onClick={() => editEvent()}>Save</Button>
      </Box>
    </Container>
  );
}

export default EditResourcePage;
