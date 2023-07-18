import { React, useEffect, useState } from 'react';
import {
  Box, Button, Container, Typography,
} from '@mui/material';
import NonprofitCard from './NonprofitCard';

function NonprofitsPage() {
  const [allNonprofits, setAllNonprofits] = useState([]);

  const getNonprofits = async () => {
    // TODO: implement get functionality
    setAllNonprofits([{
      description: 'test',
      email: 'email@email.com',
      organizationTitle: 'nonprofit',
      phoneNumber: '1234567890',
      website: 'www.website.com',
    }]);
  };

  useEffect(() => {
    getNonprofits();
  }, []);

  return (
    <Container>
      <Box>
        <Typography>Nonprofits</Typography>
      </Box>
      <Box>
        <Button>Add New +</Button>
      </Box>
      <Box>
        { allNonprofits.map((nonprofit) => (
          <NonprofitCard
            organizationTitle={nonprofit.organizationTitle}
            email={nonprofit.email}
            phoneNumber={nonprofit.phoneNumber}
            website={nonprofit.website}
          />
        ))}
      </Box>
    </Container>
  );
}

export default NonprofitsPage;
