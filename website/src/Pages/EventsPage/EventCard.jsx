import { React } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function EventCard({
  id, recurring, date, day, week, startTime, endTime, title, nonprofits, tag,
}) {
  const navigate = useNavigate();

  const viewEvent = () => {
    navigate('/event', {
      state: {
        id,
      },
    });
  };

  return (
    <Box onClick={() => viewEvent()}>
      <Box>
        <Typography>{recurring}</Typography>
        <Typography>{date}</Typography>
        <Typography>{day}</Typography>
        <Typography>{week}</Typography>
      </Box>
      <Box>
        <Typography>{startTime}</Typography>
        <Typography>{endTime}</Typography>
      </Box>
      <Box>
        <Typography>{title}</Typography>
      </Box>
      <Box>
        <Typography>{nonprofits}</Typography>
      </Box>
      <Box>
        <Typography>{recurring}</Typography>
      </Box>
      <Box>
        <Typography>{tag}</Typography>
      </Box>
    </Box>
  );
}

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  day: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  week: PropTypes.number.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  nonprofits: PropTypes.string.isRequired,
  recurring: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default EventCard;
