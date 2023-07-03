import { React } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const isoWeek = require('dayjs/plugin/isoWeek');

dayjs.extend(isoWeek);

function ResourceCard({
//   title, tag, days, startTime, endTime, address,
  title, tag, address,
}) {
  return (
    <Box sx={{ display: 'flex', border: 1 }}>
      <Box>
        <Typography>
          {title}
        </Typography>
        <Typography>
          {tag}
        </Typography>
      </Box>
      {/* <Box>
        <Box>
          {days.map((day) => (
            <Typography>{day}</Typography>
          ))}
          <Typography>{startTime}</Typography>
          <Typography>{endTime}</Typography>
        </Box>
      </Box> */}
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
  //   days: PropTypes.arrayOf(
  //     PropTypes.string.isRequired,
  //   ).isRequired,
  //   startTime: PropTypes.string.isRequired,
  //   endTime: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default ResourceCard;