import { React, useState } from 'react';
import {
  Box, Button, Container, FormControl, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker, TimePicker } from '@mui/x-date-pickers';
// import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import axios from 'axios';

function AddResourcePage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [days, setDays] = useState([]);
  //   const [startTime, setStartTime] = useState(dayjs());
  //   const [endTime, setEndTime] = useState(dayjs().add(1, 'h'));
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');

  const updateDays = (num) => {
    const updatedDaysStatus = [...days];
    updatedDaysStatus[num] = updatedDaysStatus[num] ? 1 : 0;
    setDays(updatedDaysStatus);
  };

  const backToResources = () => {
    navigate('/resources');
  };

  const createResource = async () => {
    // TODO: update for resources
    const dateDetails = {
    //   startTime: startTime.format('h:mm a'),
    //   endTime: endTime.format('h:mm a'),
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
        <Typography variant="h5">Edit Resource Info</Typography>
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
        <Typography>Hours</Typography>
        {/* <Box>
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
        </Box> */}
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
        <Typography>Website</Typography>
        <TextField
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </Box>
      <Box>
        <Typography>Thumbnail</Typography>
        TODO: picture preview
      </Box>
      <Box>
        <Button onClick={() => backToResources()}>Cancel</Button>
        <Button onClick={() => createResource()}>Save</Button>
      </Box>
    </Container>
  );
}

export default AddResourcePage;
