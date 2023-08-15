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
  const [dayTimes, setDayTimes] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  const ungroupDayTimes = (dateDetails) => {
    const ungroupedResults = [];
    dateDetails.forEach((date) => {
      date.days.forEach((day) => {
        ungroupedResults.push({
          day,
          startTime: dayjs(date.startTime, 'h:mm a'),
          endTime: dayjs(date.endTime, 'h:mm a'),
        });
      });
    });
    return ungroupedResults;
  };

  useEffect(() => {
    setTitle(resourceDetails.title);
    setTag(resourceDetails.tag);
    const ungroupedDays = ungroupDayTimes(resourceDetails.dateDetails);
    setDayTimes(ungroupedDays);
    setPhoneNumber(resourceDetails.phoneNumber);
    setLatitude(resourceDetails.locationDetails.coordinates.latitude);
    setLongitude(resourceDetails.locationDetails.coordinates.longitude);
    setAddress(resourceDetails.locationDetails.address);
    setEmail(resourceDetails.email);
    setWebsite(resourceDetails.website);
  }, []);

  const backToResources = () => {
    navigate('/resources');
  };

  const addDayTime = () => {
    const newDayTimes = [...dayTimes];
    newDayTimes.push({
      day: 0,
      startTime: dayjs(),
      endTime: dayjs().add(1, 'h'),
    });
    setDayTimes(newDayTimes);
  };

  const removeDayTime = (index) => {
    const newDayTimes = [...dayTimes];
    newDayTimes.splice(index, 1);
    setDayTimes(newDayTimes);
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
    const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/;
    return urlPattern.test(url);
  }

  function validCoord(value) {
    return value === '' || Number.isNaN(Number(value));
  }

  const validateResourceInputs = () => (title === '' || tag === '' || phoneNumber === ''
  || phoneNumber.length !== 14 || validCoord(latitude) || validCoord(longitude)
  || address === '' || !validEmail(email) || !validWebsite(website));

  const groupDayTimes = () => {
    const groupedMap = new Map();

    // Iterate through the dayTimeArray
    dayTimes.forEach((dayTime) => {
      const startTimeString = dayTime.startTime.format('h:mm a');
      const endTimeString = dayTime.endTime.format('h:mm a');
      const key = `${startTimeString}-${endTimeString}`;

      if (groupedMap.has(key)) {
        const existingGroupedDayTime = groupedMap.get(key);
        const updatedGroupedDayTime = {
          ...existingGroupedDayTime,
          days: [...new Set([...existingGroupedDayTime.days, dayTime.day])].sort((a, b) => a - b),
        };
        groupedMap.set(key, updatedGroupedDayTime);
      } else {
        groupedMap.set(key, {
          days: [dayTime.day],
          startTime: startTimeString,
          endTime: endTimeString,
        });
      }
    });

    // Create an array of grouped objects
    const groupedResults = Array.from(groupedMap.values());

    return groupedResults;
  };

  const editResource = async () => {
    if (validateResourceInputs()) {
      alert('Missing field or incorrect format.');
      return;
    }

    const dateDetails = groupDayTimes();
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
      <Box>
        {dayTimes ? (
          <Box>
            {dayTimes.map((_, index) => (
              <Box sx={{ display: 'flex' }}>
                <FormControl>
                  <Select
                    value={dayTimes[index].day}
                    defaultValue={0}
                    onChange={(e) => {
                      const newDayTimes = [...dayTimes];
                      newDayTimes[index].day = e.target.value;
                      setDayTimes(newDayTimes);
                    }}
                  >
                    <MenuItem value={0}>M</MenuItem>
                    <MenuItem value={1}>Tu</MenuItem>
                    <MenuItem value={2}>W</MenuItem>
                    <MenuItem value={3}>Th</MenuItem>
                    <MenuItem value={4}>F</MenuItem>
                    <MenuItem value={5}>Sa</MenuItem>
                    <MenuItem value={6}>Su</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex' }}>
                  <Typography>Hours</Typography>
                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={dayTimes[index].startTime}
                        onChange={(newTime) => {
                          const newDayTimes = [...dayTimes];
                          newDayTimes[index].startTime = newTime;
                          setDayTimes(newDayTimes);
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Typography>to</Typography>
                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={dayTimes[index].endTime}
                        onChange={(newTime) => {
                          const newDayTimes = [...dayTimes];
                          newDayTimes[index].endTime = newTime;
                          setDayTimes(newDayTimes);
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
                {index > 0
                  ? (
                    <Button onClick={() => removeDayTime(index)}>
                      Delete
                    </Button>
                  )
                  : null}
              </Box>
            ))}
          </Box>
        ) : (
          null
        )}
      </Box>
      <Box>
        <Button onClick={() => addDayTime()}>Add More Days</Button>
      </Box>
      <Box>
        <Typography>Phone Number</Typography>
        <TextField
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
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
