import {
  Box, Typography, Select, MenuItem,
} from '@mui/material';
import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SubmissionDetailsPage() {
  const location = useLocation();
  const {
    url, status, title, uploader, description, types, tags, date, comments,
  } = location.state;

  const [select, setSelect] = useState('Select');

  const handleSelect = (event) => {
    setSelect(event.target.value);
    // TODO: update the backend by creating a route to update status
    // TODO: pop up message for the approval or switching of status
  };

  return (
    <Box>
      <Box>
        {/* TODO: Handle different file type submissions to display */}
        <img src={url} alt="submission media" />
      </Box>
      <Box>
        <Typography>
          Status:
          {' '}
          {status}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Art Title:
          {' '}
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Uploader:
          {' '}
          {uploader}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Description:
          {' '}
          {description}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Media Type:
          {' '}
          {types.map((type) => (
            <Typography>{type}</Typography>
          ))}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Tags:
          {' '}
          {tags.map((tag) => (
            <Typography>{tag}</Typography>
          ))}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Date Submitted:
          {' '}
          {date}
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
        <Typography>{comments || ''}</Typography>
      </Box>
    </Box>
  );
}

export default SubmissionDetailsPage;
