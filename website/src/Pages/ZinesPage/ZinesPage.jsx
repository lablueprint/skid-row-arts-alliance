import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Container } from '@mui/material';
import axios from 'axios';
import ZineCard from './ZineCard';
import './ZinesPage.css';
import '../../fonts/Montserrat.css';

function ZinesPage() {
  const { count, authHeader } = useSelector((state) => state.sliceAuth);
  const [zines, setZines] = useState([]);

  const getZines = async () => {
    const allZines = await axios.get(`${process.env.REACT_APP_SERVER_URL}/zine/get`, {
      headers: authHeader,
    });
    setZines(allZines.data);
  };

  useEffect(() => {
    getZines();
  }, [count]);

  return (
    <Container sx={{ backgroundColor: '#F8F8F8', mt: 5, width: '95%' }}>
      <h1 className="title">Zines</h1>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
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
