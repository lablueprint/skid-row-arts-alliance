import { React, useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import ZineCard from '../../Components/ZinesCard/ZineCard';

function ZinesPage() {
  const [zines, setZines] = useState([]);

  const getZines = async () => {
    const response = await axios.get('http://localhost:4000/zine/get');
    console.log(response.data);
    setZines(response.data);
  };

  useEffect(() => {
    getZines();
    console.log(zines);
  }, []);
  return (
    <Container>
      <Typography variant="h5">Published Zines</Typography>
      <Box>
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
