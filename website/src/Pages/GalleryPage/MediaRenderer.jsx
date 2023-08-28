import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function MediaRenderer({ details }) {
  return (
    <Box sx={{ mt: 5 }}>
      {details.mediaData.map((media) => (
        <div>
          {media.ContentType?.startsWith('image/') && (
          <img
            style={{
              width: '100%', borderRadius: 5, marginBottom: 20, border: '1px solid #4C4C9B',
            }}
            src={media.MediaURL}
            alt={media.ContentType}
          />
          )}
          {media.ContentType?.startsWith('video/') && (
          <video
            style={{
              width: '100%', borderRadius: 5, marginBottom: 20, border: '1px solid #4C4C9B',
            }}
            src={media.MediaURL}
            controls
          >
            <track
              kind="captions"
              src={media.Captions}
              srcLang={media.CaptionsLang || 'en'}
              label="English"
            />
          </video>
          )}
          {media.ContentType?.startsWith('audio/') && (
          <audio
            style={{
              width: '100%', borderRadius: 5, marginBottom: 20,
            }}
            src={media.MediaURL}
            controls
          >
            <track
              kind="captions"
              src={media.Captions}
              srcLang={media.CaptionsLang || 'en'}
              label="English"
            />
          </audio>
          )}
        </div>
      ))}
    </Box>
  );
}

MediaRenderer.propTypes = {
  details: PropTypes.shape({
    mediaData: PropTypes.arrayOf(
      PropTypes.shape({
        ContentType: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default MediaRenderer;
