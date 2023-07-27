import { React, useEffect, useState } from 'react';
import {
  Container, Box, Typography, Button,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NonprofitCard from './NonprofitCard';

function NonprofitsPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);
  const navigate = useNavigate();

  const [nonprofits, setNonprofits] = useState([]);

  const getNonprofits = async () => {
    const response = await axios.get('http://localhost:4000/nonprofit/getall', {
      headers: authHeader,
    });
    const nonprofitsData = response.data;
    setNonprofits(nonprofitsData);
  };

  useEffect(() => {
    getNonprofits();
  }, []);

  const addNewNonprofit = () => {
    navigate('/nonprofits/add');
  };

  return (
    <Container>
      <Box>
        <Typography>NPO Partners</Typography>
      </Box>
      <Box>
        <Button onClick={() => addNewNonprofit()}>
          Add New +
        </Button>
      </Box>
      <Box>
        {nonprofits.map((nonprofit) => (
          <NonprofitCard image={nonprofit.image} title={nonprofit.title} />
        ))}
      </Box>
    </Container>
  );
}

export default NonprofitsPage;
