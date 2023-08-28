/* eslint-disable jsx-a11y/media-has-caption */
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function MediaRenderer({ mediaArray }) {
  return (
    <Box>
      {mediaArray.map((media, index) => {
        const contentType = media.ContentType.slice(0, 5);
        const mediaUrl = media.MediaURL;

        if (contentType === 'image') {
          return <img style={{ height: 300, width: 300 }} src={mediaUrl} alt={`${index}`} />;
        } if (contentType === 'audio') {
          return (
            <audio style={{ height: 300, width: 300 }} controls>
              <source src={mediaUrl} type="audio/mpeg" />
            </audio>
          );
        } if (contentType === 'video') {
          return (
            <video style={{ height: 300, width: 300 }} controls>
              <source src={mediaUrl} type="video/mp4" />
            </video>
          );
        }

        return null;
      })}
    </Box>
  );
}

MediaRenderer.propTypes = {
  mediaArray: PropTypes.arrayOf(
    PropTypes.shape({
      ContentType: PropTypes.string.isRequired,
      MediaURL: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MediaRenderer;
