import {
  Box, Typography, Menu, MenuItem,
} from '@mui/material';
import { React } from 'react';
import { useLocation } from 'react-router-dom';

function SubmissionDetailsPage() {
  const location = useLocation();
  const {
    status, title, uploader, description, types, tags, date, comments,
  } = location.state;
  return (
    <Box>
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
        <Menu>
          <MenuItem>Approve</MenuItem>
          <MenuItem>Reject</MenuItem>
        </Menu>
      </Box>
      <Box>
        <Typography>Comments:</Typography>
        <Typography>{comments || ''}</Typography>
      </Box>
    </Box>
  );
}

export default SubmissionDetailsPage;
