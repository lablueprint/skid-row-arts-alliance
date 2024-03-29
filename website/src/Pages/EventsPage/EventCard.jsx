import { React } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const isoWeek = require('dayjs/plugin/isoWeek');

dayjs.extend(isoWeek);

function EventCard({
  recurring, day, date, startTime, endTime, title, host, tag,
}) {
  const dayLetters = dayjs().isoWeekday(day).format('ddd').toUpperCase();

  return (
    <Box sx={{ display: 'flex', border: 1 }}>
      <Box sx={{ margin: 2 }}>
        <Typography>{dayLetters}</Typography>
        <Typography>
          {date.slice(5, 7)}
          /
          {date.slice(8, 10)}
        </Typography>
      </Box>
      <Box sx={{ margin: 2 }}>
        <Typography>
          {startTime}
          {' '}
          -
          {' '}
          {endTime}
        </Typography>
      </Box>
      <Box sx={{ margin: 2 }}>
        <Typography>
          {title.substring(0, 31)}
          ...
        </Typography>
        <Typography>{host}</Typography>
      </Box>
      <Box sx={{ margin: 2 }}>
        { recurring === 'Does not repeat' ? (
          <>
          </>
        ) : (
          <Typography>{recurring}</Typography>
        )}
      </Box>
      <Box sx={{ margin: 2 }}>
        <Typography>{tag}</Typography>
      </Box>
    </Box>
  );
}

EventCard.propTypes = {
  day: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  recurring: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default EventCard;
