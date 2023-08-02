import { React } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const isoWeek = require('dayjs/plugin/isoWeek');

dayjs.extend(isoWeek);

function ResourceCard({
  title, tag, dateDetails, address,
}) {
  const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

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
        {dateDetails.map((date) => (
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
          {address}
        </Typography>
      </Box>
    </Box>
  );
}

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  dateDetails: PropTypes.arrayOf(
    PropTypes.shape({
      days: PropTypes.arrayOf(PropTypes.number),
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
    }),
  ).isRequired,

  address: PropTypes.string.isRequired,
};

export default ResourceCard;
