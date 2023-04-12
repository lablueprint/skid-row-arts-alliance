import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Container, Typography, TextField, Button,
} from '@mui/material';
import { isTokenExpired, login } from '../../redux/sliceAuth';

function SignInPage() {
  const { id, token } = useSelector((state) => state.sliceAuth);
  const dispatch = useDispatch();
  // Navigation functions to pages
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const response = await axios.post('http://localhost:4000/auth/admin-sign-in', { username, password });
    if (response.data) {
      dispatch(login(response.data));
    } else {
      alert('Handle or password is incorrect');
    }
  };

  useEffect(() => {
    if (!isTokenExpired(token) && id && token) {
      navigate('/gallery');
    }
  }, [id, token]);

  return (
    <Container>
      <Typography variant="h3">Sign In Page</Typography>
      <TextField label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={() => { handleSignIn(); }}>Sign In</Button>
    </Container>
  );
}

export default SignInPage;
