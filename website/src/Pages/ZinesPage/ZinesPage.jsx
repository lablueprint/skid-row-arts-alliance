import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import ZineCard from './ZineCard';

function ZinesPage() {
  const { count, authHeader } = useSelector((state) => state.sliceAuth);
  const [zines, setZines] = useState([]);

  const getZines = async () => {
    const allZines = await axios.get('http://localhost:4000/zine/get', {
      headers: authHeader,
    });
    setZines(allZines.data);
  };

  useEffect(() => {
    getZines();
  }, [count]);

  return (
    <Container sx={{ backgroundColor: '#F8F8F8' }}>
      <Typography variant="h5">Published Zines</Typography>
      <Box sx={{ display: 'flex' }}>
        {zines.map((zine) => (
          <ZineCard
            key={zine._id}
            id={zine._id}
            title="The Skid Row Arts Zine"
            season={zine.season}
            year={zine.year}
            url={zine.url}
          />
        ))}
      </Box>
    </Container>
  );
}

export default ZinesPage;
