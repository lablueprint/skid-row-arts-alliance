import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import {
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';
import '../../fonts/Montserrat.css';
import incompleteDot from '../../assets/incompleteDot.png';
import rejectedDot from '../../assets/rejectedDot.png';
import approvedDot from '../../assets/approvedDot.png';
import imgIcon from '../../assets/imgIcon.png';
import vidIcon from '../../assets/vidIcon.png';
import audIcon from '../../assets/audIcon.png';

function GalleryPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);
  const navigate = useNavigate();
  const [submissionData, setSubmissionData] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedMediaTypes, setSelectedMediaTypes] = useState([]);

  const handleStatusChange = (event) => {
    setSelectedStatuses(event.target.value);
  };
  const handleMediaTypeChange = (event) => {
    setSelectedMediaTypes(event.target.value);
  };

  const filteredData = selectedStatuses.length === 0
  && selectedMediaTypes.length === 0 ? submissionData
    : submissionData.filter((submission) => {
      // Default / no filters selected
      if (selectedStatuses.length === 0 && selectedMediaTypes.length === 0) {
        return submissionData;
      }
      // Only status selected
      if (selectedStatuses.length > 0 && selectedMediaTypes.length === 0) {
        return selectedStatuses.includes(submission.Status);
      }
      // Only media type selected
      if (selectedStatuses.length === 0 && selectedMediaTypes.length > 0) {
        return selectedMediaTypes.some((selectedType) => submission['Media Type'].includes(selectedType));
      }
      // Status and media type selected
      return selectedStatuses.includes(submission.Status)
      && selectedMediaTypes.some((selectedType) => submission['Media Type'].includes(selectedType));
    });

  // TODO: further styling needed for pagination
  const columns = [
    { field: 'Submission Title', width: 250 },
    { field: 'Uploader', width: 200 },
    { field: 'Status', width: 200 },
    { field: 'Media Type', width: 250 },
    { field: 'Date', width: 200 },
  ];

  const getSubmissionData = async () => {
    const response = await axios.get(
      'http://localhost:4000/submissions/getsubmissions',
      {
        headers: authHeader,
      },
    );
    const data = response.data.map((submission, index) => ({
      id: index,
      submissionId: submission.id,
      'Submission Title': submission.title,
      Uploader: submission.name,
      Status: submission.status,
      'Media Type': submission.type,
      Date: submission.date,
    }));
    setSubmissionData(data);
  };

  useEffect(() => {
    getSubmissionData();
  }, []);

  const viewArtwork = (params) => {
    const index = params.id;
    navigate('/submission', {
      state: {
        id: submissionData[index].submissionId,
      },
    });
  };

  return (
    <Container sx={{ mt: 5, width: '95%' }}>
      <h1 className="title">Gallery Submissions</h1>
      <div className="filters">
        <FormControl sx={{ minWidth: 225 }} size="small">
          <InputLabel id="status-multiselect-label" sx={{ fontFamily: 'Montserrat-Regular, sans-serif' }}>Status</InputLabel>
          <Select
            labelId="status-multiselect-label"
            id="status-multiselect"
            multiple
            value={selectedStatuses}
            onChange={handleStatusChange}
            renderValue={(selected) => (
              <div className="status-selections">{selected.join(', ')}</div>
            )}
            label="Status"
            sx={{
              minWidth: 225, fontFamily: 'Montserrat-Regular, sans-serif', mb: 3, backgroundColor: 'white',
            }}
          >
            <MenuItem value="Incomplete">
              <Checkbox checked={selectedStatuses.includes('Incomplete')} />
              <img
                src={incompleteDot}
                alt="Yellow dot for incomplete"
                className="dropdown-icon"
              />
              <p className="dropdown-option-text">Incomplete</p>
            </MenuItem>
            <MenuItem value="Rejected">
              <Checkbox checked={selectedStatuses.includes('Rejected')} />
              <img
                src={rejectedDot}
                alt="Red dot for rejected"
                className="dropdown-icon"
              />
              <p className="dropdown-option-text">Rejected</p>
            </MenuItem>
            <MenuItem value="Approved">
              <Checkbox checked={selectedStatuses.includes('Approved')} />
              <img
                src={approvedDot}
                alt="Green dot for approved"
                className="dropdown-icon"
              />
              <p className="dropdown-option-text">Approved</p>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 225, ml: 2 }} size="small">
          <InputLabel id="media-type-multiselect-label" sx={{ fontFamily: 'Montserrat-Regular, sans-serif' }}>Media Type</InputLabel>
          <Select
            labelId="media-type-multiselect-label"
            id="media-type-multiselect"
            multiple
            value={selectedMediaTypes}
            onChange={handleMediaTypeChange}
            renderValue={(selected) => (
              <div className="media-type-selections">{selected.join(', ')}</div>
            )}
            label="Media Type"
            sx={{
              minWidth: 225, fontFamily: 'Montserrat-Regular, sans-serif', mb: 3, backgroundColor: 'white',
            }}
          >
            <MenuItem value="image">
              <Checkbox checked={selectedMediaTypes.includes('image')} />
              <img
                src={imgIcon}
                alt="Pic icon"
                className="dropdown-icon"
              />
              <p className="dropdown-option-text">Image</p>
            </MenuItem>
            <MenuItem value="video">
              <Checkbox checked={selectedMediaTypes.includes('video')} />
              <img
                src={vidIcon}
                alt="Film camera icon"
                className="dropdown-icon"
              />
              <p className="dropdown-option-text">Video</p>
            </MenuItem>
            <MenuItem value="audio">
              <Checkbox checked={selectedMediaTypes.includes('audio')} />
              <img
                src={audIcon}
                alt="Audio file icon"
                className="dropdown-icon"
              />
              <p className="dropdown-option-text">Audio</p>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <DataGrid
        rows={filteredData}
        columns={columns}
        autoHeight
        checkboxSelection
        onRowClick={(params) => viewArtwork(params)}
        sx={{
          fontFamily: 'Montserrat-Regular, sans-serif',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#4C4C9B',
            color: 'white',
            fontFamily: 'Montserrat-Medium, sans-serif',
            fontSize: '17px',
          },
          mb: 6,
        }}
      />
    </Container>
  );
}

export default GalleryPage;
