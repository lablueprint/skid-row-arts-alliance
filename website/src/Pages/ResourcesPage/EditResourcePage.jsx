import { React, useEffect, useState } from 'react';
import {
  Box, Button, Container, FormControl, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import axios from 'axios';

function EditResourcePage() {
  const location = useLocation();
  const {
    resourceDetails,
  } = location.state;

  const { authHeader } = useSelector((state) => state.sliceAuth);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [days, setDays] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(1, 'h'));
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const daysOfWeek = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];

  useEffect(() => {
    setTitle(resourceDetails.title);
    setTag(resourceDetails.tag);
    setPhoneNumber(resourceDetails.phoneNumber);
    setDays(resourceDetails.days);
    setStartTime(dayjs(resourceDetails.dateDetails.startTime, 'h:mm a'));
    setEndTime(dayjs(resourceDetails.dateDetails.endTime, 'h:mm a'));
    setLatitude(resourceDetails.locationDetails.coordinates.latitude);
    setLongitude(resourceDetails.locationDetails.coordinates.longitude);
    setAddress(resourceDetails.locationDetails.address);
    setEmail(resourceDetails.email);
    setWebsite(resourceDetails.website);
    setDays(resourceDetails.dateDetails.days);
  }, []);

  const backToResources = () => {
    navigate('/resources');
  };

  const updateDays = (dayValue) => {
    const foundIndex = days.findIndex((day) => day === dayValue);
    if (foundIndex !== -1) {
      setDays((prevDays) => {
        const newDays = [...prevDays];
        newDays.splice(foundIndex, 1);
        return newDays;
      });
    } else {
      setDays((prevDays) => {
        const newDays = [...prevDays, dayValue];
        newDays.sort((a, b) => a - b);
        return newDays;
      });
    }
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

  const validEmail = ((e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(e);
  });

  function validWebsite(url) {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    return urlPattern.test(url);
  }

  const validateResourceInputs = () => (title === '' || tag === '' || days.length === 0
  || latitude === '' || longitude === '' || address === '' || !validEmail(email) || !validWebsite(website));

  const editResource = async () => {
    if (validateResourceInputs()) {
      alert('Missing field or incorrect format.');
      return;
    }

    const dateDetails = {
      days,
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
    const updatedResource = {
      title,
      dateDetails,
      locationDetails,
      tag,
      phoneNumber,
      email,
      website,
    };
    await axios.patch(`http://localhost:4000/resource/update/${resourceDetails._id}`, updatedResource, {
      headers: authHeader,
    });
    backToResources();
  };

  return (
    <Container>
      <Box>
        <Typography variant="h5">Edit Resource Card</Typography>
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
        { daysOfWeek.map((day, index) => (
          <Button
            variant="contained"
            style={{ backgroundColor: days.includes(index) ? '#4C4C9B' : '#D0D0E8' }}
            onClick={() => updateDays(index)}
          >
            {day}
          </Button>
        ))}
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
        <Button onClick={() => editResource()}>Save</Button>
      </Box>
    </Container>
  );
}

export default EditResourcePage;
