import { React } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const isoWeek = require('dayjs/plugin/isoWeek');

dayjs.extend(isoWeek);

function ResourceCard({
  title, tag, days, startTime, endTime, address,
}) {
  console.log(days);
  // const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

  return (
    <Box sx={{ border: 1 }}>
      <Box sx={{ display: 'flex' }}>
        <Typography>
          {title}
        </Typography>
        <Typography>
          {tag}
        </Typography>
      </Box>
      <Box>
        <Box sx={{ display: 'flex' }}>
          {/* <Typography>{days.map((dayIndex) => daysOfWeek[dayIndex]).join(', ')}</Typography> */}
          <Typography>{startTime}</Typography>
          <Typography>{endTime}</Typography>
        </Box>
      </Box>
      <Box>
        <Typography>
          {address}
        </Typography>
      </Box>
    </Box>
  );
}

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  days: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default ResourceCard;
