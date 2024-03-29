import { React, useEffect, useState } from 'react';
import {
  Box, Button, Container, FormControl, Grid, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import axios from 'axios';
import EventImageCard from './EventImageCard';

function EditEventPage() {
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
  const [imageData, setImageData] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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
    setImageData(eventDetails.images);
    setImagePreviews(eventDetails.imageUrls);
  }, []);

  const backToEvents = () => {
    navigate('/events');
  };

  const validateEventInputs = () => (title === '' || host === '' || tag === ''
  || latitude === '' || longitude === '' || description === '');

  const editEvent = async () => {
    if (validateEventInputs()) {
      alert('Missing input.');
      return;
    }

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
    const originalImages = imageData.filter((image) => typeof image === 'string');
    const updatedEvent = {
      title,
      dateDetails,
      locationDetails,
      host,
      description,
      tag,
      images: originalImages,
    };

    const formData = new FormData();
    formData.append('updatedEvent', JSON.stringify(updatedEvent));
    imageData.forEach((image) => {
      formData.append('image', image);
    });
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/event/update/${eventDetails._id}`, formData, {
      headers: {
        ...authHeader,
        'Content-Type': 'multipart/form-data',
      },
    });
    backToEvents();
  };

  const uploadImage = (event) => {
    const files = Array.from(event.target.files);
    setImageData([...imageData, ...files]);
    const updatedImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...updatedImagePreviews]);
  };

  const removeImage = (index) => {
    const updatedImageData = [...imageData];
    updatedImageData.splice(index, 1);
    setImageData(updatedImageData);
    const updatedImagePreviews = [...imagePreviews];
    updatedImagePreviews.splice(index, 1);
    setImagePreviews(updatedImagePreviews);
  };

  const deleteEvent = async () => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/event/delete/${eventDetails._id}`, {
      headers: authHeader,
    });
    backToEvents();
  };

  return (
    <Container>
      <Box>
        <Box>
          <Typography variant="h5">Edit Event Info</Typography>
        </Box>
        <Box>
          <Button onClick={() => deleteEvent()}>Delete Event</Button>
        </Box>
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
        <Grid container spacing={2}>
          {imagePreviews.map((image, index) => (
            <Grid item>
              <EventImageCard
                image={image}
                index={index}
                removeImage={removeImage}
              />
            </Grid>
          ))}
        </Grid>
        <label style={{ marginTop: '20px' }} htmlFor="upload-button">
          <Button
            variant="outlined"
            component="span"
            sx={{ marginTop: '20px' }}
          >
            Upload Images
          </Button>
          <input
            accept="image/*"
            id="upload-button"
            multiple
            style={{ display: 'none' }}
            type="file"
            onChange={uploadImage}
          />
        </label>
      </Box>
      <Box>
        <Button onClick={() => backToEvents()}>Cancel</Button>
        <Button onClick={() => editEvent()}>Save</Button>
      </Box>
    </Container>
  );
}

export default EditEventPage;
