import { React } from 'react';
import { Box, Typography } from '@mui/material';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ZineCard({
  id, title, season, year, url,
}) {
  const navigate = useNavigate();

  const viewZine = () => {
    navigate('/zine', {
      state: {
        id,
      },
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF', border: 1, borderColor: '#C4C8CA', margin: '5px', width: '250px',
      }}
      onClick={() => viewZine()}
    >
      <Typography>{title}</Typography>
      <Typography>
        {season}
        {' '}
        {year}
      </Typography>
      <Box>
        <Document style={{ height: '50px' }} file={url}>
          <Page pageNumber={1} renderTextLayer={false} height={250} />
        </Document>
      </Box>
    </Box>
  );
}

ZineCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ZineCard;
