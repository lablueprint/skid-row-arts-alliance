import { React, useState } from 'react';
import {
  Box, Button, Container, FormControl, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
// import axios from 'axios';

function AddEventPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [hosts, setHosts] = useState([]);
  const [tag, setTag] = useState('');
  const [date, setDate] = useState(dayjs());
  const [day, setDay] = useState('');
  const [recurrence, setRecurrence] = useState('');
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(1, 'h'));
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');

  const backToEvents = () => {
    navigate('/events');
  };

  const createEvent = async () => {
    // await axios.post('http://localhost:4000/events/create');
    // TODO: convert the text objects to the final form, set lat and long to numbers
    // new Date(date)
    // backToEvents();
  };

  return (
    <Container>
      <Box>
        <Typography variant="h5">Add New Event</Typography>
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
              value={hosts}
              onChange={(e) => {
                setHosts(e.target.value);
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
            <DatePicker value={date} onChange={(newDate) => setDate(newDate)} />
          </LocalizationProvider>
        </Box>
        <Box>
          <Typography>Day</Typography>
          <FormControl fullWidth>
            <Select
              value={day}
              onChange={(e) => {
                setDay(e.target.value);
              }}
            >
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
              <MenuItem value="Saturday">Saturday</MenuItem>
              <MenuItem value="Sunday">Sunday</MenuItem>
            </Select>
          </FormControl>
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
        <Typography>Details</Typography>
        <TextField
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </Box>
      <Box>
        <Button onClick={() => backToEvents()}>Cancel</Button>
        <Button onClick={() => createEvent()}>Save</Button>
      </Box>
    </Container>
  );
}

export default AddEventPage;
