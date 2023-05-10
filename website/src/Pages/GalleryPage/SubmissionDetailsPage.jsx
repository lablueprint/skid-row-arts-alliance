import {
  Box, Typography, Select, MenuItem,
} from '@mui/material';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SubmissionDetailsPage() {
  const location = useLocation();
  const {
    id,
  } = location.state;

  const [details, setDetails] = useState({
    mediaData: [''],
    status: '',
    title: '',
    uploader: '',
    description: '',
    mediaTypes: [''],
    tags: [''],
    date: '',
    comments: '',
  });

  const getSubmissionDetails = async () => {
    const artwork = await axios.get('http://localhost:4000/submissions/getartwork', { params: { id } });
    setDetails({
      mediaData: artwork.data.MediaData,
      status: artwork.data.Submission.status,
      title: artwork.data.Submission.title,
      uploader: artwork.data.Submission.uploader,
      description: artwork.data.Submission.description,
      mediaTypes: artwork.data.Submission.mediaTypes,
      tags: artwork.data.Submission.tags,
      date: artwork.data.Submission.date,
      comments: artwork.data.Submission.comments,
    });
  };

  useEffect(() => {
    getSubmissionDetails();
  }, []);

  const [select, setSelect] = useState('Select');

  const handleSelect = (event) => {
    setSelect(event.target.value);
    // TODO: update the backend by creating a route to update status
    // TODO: pop up message for the approval or switching of status
  };

  return (
    <Box>
      <Box>
        {details.mediaData.map((media) => (
          // TODO: adjust the rendering for each type of media
          <img src={media.MediaURL} alt={media.ContentType} />
        ))}
      </Box>
      <Box>
        <Typography>
          Status:
          {' '}
          {details.status}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Art Title:
          {' '}
          {details.title}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Uploader:
          {' '}
          {details.uploader}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Description:
          {' '}
          {details.description}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Media Type:
          {' '}
          {details.mediaTypes.map((type) => (
            <Typography>{type}</Typography>
          ))}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Tags:
          {' '}
          {details.tags.map((tag) => (
            <Typography>{tag}</Typography>
          ))}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Date Submitted:
          {' '}
          {details.date}
        </Typography>
      </Box>
      <Box>
        <Select label="Select" value={select} onChange={handleSelect}>
          <MenuItem value="Approve">Approve</MenuItem>
          <MenuItem value="Reject">Reject</MenuItem>
        </Select>
      </Box>
      <Box>
        <Typography>Comments:</Typography>
        <Typography>{details.comments}</Typography>
        {/* TODO: change this to render as a text box */}
      </Box>
    </Box>
  );
}

export default SubmissionDetailsPage;
