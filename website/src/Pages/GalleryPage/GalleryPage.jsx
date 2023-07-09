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

function GalleryPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);
  const navigate = useNavigate();
  const [submissionData, setSubmissionData] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleStatusChange = (event) => {
    setSelectedStatuses(event.target.value);
  };
  const filteredData = selectedStatuses.length === 0
    ? submissionData
    : submissionData.filter((submission) => selectedStatuses.includes(submission.Status));

  // TODO: further styling needed for pagination
  const columns = [
    { field: 'Submission Title', width: 200 },
    { field: 'Uploader', width: 150 },
    { field: 'Status', width: 150 },
    { field: 'Media Type', width: 200 },
    { field: 'Date', width: 150 },
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
          <InputLabel id="status-multiselect-label">Status</InputLabel>
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
                className="status-dot"
              />
              <p className="dropdown-option-text">Incomplete</p>
            </MenuItem>
            <MenuItem value="Rejected">
              <Checkbox checked={selectedStatuses.includes('Rejected')} />
              <img
                src={rejectedDot}
                alt="Red dot for rejected"
                className="status-dot"
              />
              <p className="dropdown-option-text">Rejected</p>
            </MenuItem>
            <MenuItem value="Approved">
              <Checkbox checked={selectedStatuses.includes('Approved')} />
              <img
                src={approvedDot}
                alt="Green dot for approved"
                className="status-dot"
              />
              <p className="dropdown-option-text">Approved</p>
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
      />
    </Container>
  );
}

export default GalleryPage;
