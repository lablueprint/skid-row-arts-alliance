import { React, useState } from 'react';
import {
  Box, Button, Container, FormControl, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import axios from 'axios';

function AddResourcePage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [days, setDays] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(1, 'h'));
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  const updateDays = (num) => {
    const updatedDaysStatus = [...days];
    updatedDaysStatus[num] = updatedDaysStatus[num] ? 0 : 1;
    setDays(updatedDaysStatus);
  };

  const backToResources = () => {
    navigate('/resources');
  };

  const handlePhoneNumberChange = (event) => {
    const inputValue = event.target.value;

    // Remove all non-numeric characters from the input value
    const numericValue = inputValue.replace(/\D/g, '');

    // Format the phone number once it reaches 10 digits
    if (numericValue.length === 10) {
      const formattedValue = `(${numericValue.slice(0, 3)}) ${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
      setPhoneNumber(formattedValue);
    } else if (numericValue.length < 10) {
      setPhoneNumber(numericValue);
    }
  };

  const createResource = async () => {
    const daysOfWeek = [];
    days.forEach((day, index) => {
      if (day) {
        daysOfWeek.push(index);
      }
    });
    const dateDetails = {
      days: daysOfWeek,
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
    const newResource = {
      title,
      dateDetails,
      locationDetails,
      tag,
      phoneNumber,
      email,
      website,
    };
    await axios.post('http://localhost:4000/resource/post', newResource, {
      headers: authHeader,
    });
    backToResources();
  };

  return (
    <Container>
      <Box>
        <Typography variant="h5">Add Resource Card</Typography>
      </Box>
      <Box>
        <Typography>Resource Title</Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
            <MenuItem value="food">food</MenuItem>
            <MenuItem value="shelter">shelter</MenuItem>
            <MenuItem value="health">health</MenuItem>
            <MenuItem value="legal services">legal services</MenuItem>
            <MenuItem value="shower">shower</MenuItem>
            <MenuItem value="mission">mission</MenuItem>
            <MenuItem value="social services">social services</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Button
          variant="contained"
          style={{ backgroundColor: days[0] ? '#4C4C9B' : '#D0D0E8' }}
          onClick={() => updateDays(0)}
        >
          M
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: days[1] ? '#4C4C9B' : '#D0D0E8' }}
          onClick={() => updateDays(1)}
        >
          Tu
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: days[2] ? '#4C4C9B' : '#D0D0E8' }}
          onClick={() => updateDays(2)}
        >
          W
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: days[3] ? '#4C4C9B' : '#D0D0E8' }}
          onClick={() => updateDays(3)}
        >
          Th
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: days[4] ? '#4C4C9B' : '#D0D0E8' }}
          onClick={() => updateDays(4)}
        >
          F
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: days[5] ? '#4C4C9B' : '#D0D0E8' }}
          onClick={() => updateDays(5)}
        >
          Sa
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: days[6] ? '#4C4C9B' : '#D0D0E8' }}
          onClick={() => updateDays(6)}
        >
          Su
        </Button>
      </Box>
      <Box>
        <Typography>Phone Number</Typography>
        <TextField
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </Box>
      <Box>
        <Typography>Hours</Typography>
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
        <Typography>Email</Typography>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box>
        <Typography>Website</Typography>
        <TextField
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </Box>
      <Box>
        <Button onClick={() => backToResources()}>Cancel</Button>
        <Button onClick={() => createResource()}>Save</Button>
      </Box>
    </Container>
  );
}

export default AddResourcePage;
