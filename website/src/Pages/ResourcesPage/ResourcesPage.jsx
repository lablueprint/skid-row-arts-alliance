import { React, useEffect, useState } from 'react';
import {
  Box, Button, Container, Typography, Modal,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import ResourceCard from './ResourceCard';

const isoWeek = require('dayjs/plugin/isoWeek');
const isBetween = require('dayjs/plugin/isBetween');

dayjs.extend(isoWeek);
dayjs.extend(isBetween);

function ResourcesPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);
  const navigate = useNavigate();

  const [allResources, setAllResources] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);
  const [previewDetails, setPreviewDetails] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

  const getResources = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/resource/get`, {
      headers: authHeader,
    });
    const resources = response.data;
    setAllResources(resources);
  };

  useEffect(() => {
    getResources();
  }, [refresh]);

  const addNewResource = () => {
    navigate('/resources/add');
  };

  const editResourceDetails = (id) => {
    const resourceDetails = allResources.find((e) => e._id === id);
    navigate('/resources/edit', {
      state: {
        resourceDetails,
      },
    });
  };

  const deleteResource = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/resource/delete/${id}`, {
      headers: authHeader,
    });
    setRefresh((val) => val + 1);
    setOpenPreview(false);
  };

  const previewResourceDetails = (resourceDetails) => {
    setOpenPreview(true);
    setPreviewDetails(resourceDetails);
  };

  return (
    <Container>
      <Box>
        <Typography variant="h5">Resources</Typography>
      </Box>
      <Box>
        <Box>
          Filter
        </Box>
        <Box>
          <Button onClick={() => { addNewResource(); }}>
            Add New +
          </Button>
        </Box>
      </Box>
      <Box>
        {allResources.map((resource) => (
          <Box
            key={resource._id}
            onClick={() => previewResourceDetails(resource)}
          >
            <ResourceCard
              title={resource.title}
              tag={resource.tag}
              dateDetails={resource.dateDetails}
              address={resource.locationDetails.address}
            />
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
              <Button onClick={() => editResourceDetails(previewDetails._id)}>Edit</Button>
              <Button onClick={() => deleteResource(previewDetails._id)}>Delete</Button>
              <Button onClick={() => setOpenPreview(false)}>Close</Button>
            </Box>
            <Box>
              <Typography>
                {previewDetails.title}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography>
                {previewDetails.host}
              </Typography>
              <Typography>
                {previewDetails.tag}
              </Typography>
            </Box>
            <Box>
              {previewDetails.dateDetails.map((date) => (
                <Box sx={{ display: 'flex' }}>
                  <Typography>{date.days.map((dayIndex) => daysOfWeek[dayIndex]).join(', ')}</Typography>
                  <Typography>
                    {date.startTime}
                    -
                    {date.endTime}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box>
              <Typography>
                {previewDetails.phoneNumber}
              </Typography>
            </Box>
            <Box>
              <Typography>
                {previewDetails.locationDetails.address}
              </Typography>
            </Box>
            <Box>
              <Typography>
                {previewDetails.website}
              </Typography>
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

export default ResourcesPage;
