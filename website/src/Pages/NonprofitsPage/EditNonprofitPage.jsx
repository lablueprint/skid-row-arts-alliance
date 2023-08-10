import { React, useEffect, useState } from 'react';
import {
  Container, Box, Typography, Button, TextField,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

function EditNonprofitPage() {
  const location = useLocation();
  const {
    nonprofitDetails,
  } = location.state;

  //   const { authHeader } = useSelector((state) => state.sliceAuth);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [imageData, setImageData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setTitle(nonprofitDetails.title);
    setPhoneNumber(nonprofitDetails.phoneNumber);
    setEmail(nonprofitDetails.email);
    setWebsite(nonprofitDetails.website);
  }, []);

  const backToNonprofits = () => {
    console.log(imageData);
    navigate('/nonprofits');
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

  const uploadImage = (event) => {
    const file = event.target.files[0];
    setImageData(file);
    const fileURL = URL.createObjectURL(file);
    setImagePreview(fileURL);
  };

  const removeImage = () => {
    setImageData(null);
    setImagePreview(null);
  };

  // TODO: validate email and website

  return (
    <Container>
      <Box>
        <Typography>Edit NPO Partner</Typography>
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
      <Box>
        <Typography>Thumbnail</Typography>
        <Box>
          { imagePreview !== null ? (
            <Box>
              <img src={imagePreview} alt="Nonprofit" />
              <Button>Replace</Button>
              <Button onClick={() => removeImage()}>Remove</Button>
            </Box>
          ) : (
            <label htmlFor="upload-button">
              <Button
                variant="outlined"
                component="span"
                sx={{ marginTop: '20px' }}
              >
                Upload Thumbnail
              </Button>
              <input
                accept="image/*"
                id="upload-button"
                style={{ display: 'none' }}
                type="file"
                onChange={uploadImage}
              />
            </label>
          )}
        </Box>
      </Box>
      <Box>
        <Button onClick={() => backToNonprofits()}>Cancel</Button>
        <Button>Save</Button>
      </Box>
    </Container>
  );
}

export default EditNonprofitPage;
