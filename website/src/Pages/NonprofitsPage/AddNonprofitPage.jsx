import { React, useState } from 'react';
import {
  Container, Box, Typography, Button, TextField,
} from '@mui/material';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

function AddNonprofitPage() {
//   const { authHeader } = useSelector((state) => state.sliceAuth);
  const [title, setTitle] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

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

  return (
    <Container>
      <Box>
        <Typography>Add NPO Partner</Typography>
      </Box>
      <Box>
        <Typography>NPO Name</Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box>
        <Box>
          <Typography>Phone Number</Typography>
          <TextField
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </Box>
        <Box>
          <Typography>Email</Typography>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      </Box>
      <Box>
        <Typography>Website</Typography>
        <TextField
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </Box>
      <Box>
        <Button>Replace</Button>
        <Button>X</Button>
      </Box>
    </Container>
  );
}

export default AddNonprofitPage;
