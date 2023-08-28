import { React } from 'react';
import { Box } from '@mui/material';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './ZinesCard.css';
import '../../fonts/Montserrat.css';
import pdfIcon from '../../assets/pdfIcon.png';

function ZineCard({
  id, title, season, year, url,
}) {
  const navigate = useNavigate();

  const viewZineDetails = () => {
    navigate('/zine', {
      state: {
        id,
      },
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        border: 1,
        borderColor: '#C4C8CA',
        borderRadius: 1,
        width: '20%',
        mr: 2,
        mb: 4,
        p: 2,
        position: 'relative',
      }}
      onClick={() => viewZineDetails()}
    >
      <Box sx={{ display: 'inline-flex' }}>
        <img src={pdfIcon} alt="PDF icon" className="pdf-icon" />
        <Box>
          <h1 className="card-title">{title}</h1>
          <h2 className="season-year">
            {season}
            {' '}
            {year}
          </h2>
        </Box>
      </Box>
      <Box
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          maxHeight: '200px',
        }}
      >
        <Document
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          file={url}
        >
          <Page pageNumber={1} renderTextLayer={false} height={300} />
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
