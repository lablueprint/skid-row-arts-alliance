import { React, useEffect, useState } from 'react';
import {
  Container, Box, Typography, Button, Modal,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NonprofitCard from './NonprofitCard';

function NonprofitsPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);
  const navigate = useNavigate();

  const [nonprofits, setNonprofits] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);
  const [previewDetails, setPreviewDetails] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const getNonprofits = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/nonprofit/getall`, {
      headers: authHeader,
    });
    const nonprofitsData = response.data;
    setNonprofits(nonprofitsData);
  };

  useEffect(() => {
    getNonprofits();
  }, [refresh]);

  const addNewNonprofit = () => {
    navigate('/nonprofits/add');
  };

  const editNonprofitDetails = (nonprofitDetails) => {
    navigate('/nonprofits/edit', {
      state: {
        nonprofitDetails,
      },
    });
  };

  const deleteNonprofit = async (nonprofitId) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/nonprofit/delete/${nonprofitId}`, {
      headers: authHeader,
    });
    setOpenPreview(false);
    setRefresh((val) => val + 1);
  };

  const previewEventDetails = (nonprofitDetails) => {
    setOpenPreview(true);
    setPreviewDetails(nonprofitDetails);
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
          <Box
            key={nonprofit._id}
            onClick={() => previewEventDetails(nonprofit)}
          >
            <NonprofitCard image={nonprofit.imageURL} title={nonprofit.title} />
          </Box>
        ))}
      </Box>
      <Modal
        open={openPreview}
        onClose={() => setOpenPreview(false)}
      >
        { previewDetails !== null ? (
          <Box sx={{
            position: 'relative',
            top: '50%',
            left: '50%',
            width: 600,
            height: 500,
            backgroundColor: 'white',
          }}
          >
            <Box>
              <Button onClick={() => editNonprofitDetails(previewDetails)}>Edit</Button>
              <Button onClick={() => deleteNonprofit(previewDetails._id)}>Delete</Button>
              <Button onClick={() => setOpenPreview(false)}>Close</Button>
            </Box>
            <Box>
              <Typography>{previewDetails.title}</Typography>
            </Box>
            <Box>
              <Typography>{previewDetails.description}</Typography>
            </Box>
            <Box>
              <Typography>{previewDetails.phoneNumber}</Typography>
            </Box>
            <Box>
              <Typography>{previewDetails.email}</Typography>
            </Box>
            <Box>
              <Typography>{previewDetails.website}</Typography>
            </Box>
            <Box>
              <img style={{ height: 225, width: 450 }} src={previewDetails.imageURL} alt="Nonprofit" />
            </Box>
          </Box>
        ) : (
          <>
          </>
        )}
      </Modal>
    </Container>
  );
}

export default NonprofitsPage;
