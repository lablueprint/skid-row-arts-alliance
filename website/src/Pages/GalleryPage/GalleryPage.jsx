import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GalleryPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);
  const navigate = useNavigate();
  const [submissionData, setSubmissionData] = useState([]);

  // TODO: further styling needed for pagination
  const columns = [
    { field: 'Submission Title', width: 200 },
    { field: 'Uploader', width: 150 },
    { field: 'Status', width: 150 },
    { field: 'Media Type', width: 200 },
    { field: 'Date', width: 150 }];

  const getSubmissionData = async () => {
    const response = await axios.get('http://localhost:4000/submissions/getsubmissions', {
      headers: authHeader,
    });
    const data = response.data.map((submission, index) => (
      {
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
    <Container>
      <Typography variant="h5">Recent Submissions</Typography>
      <DataGrid
        rows={submissionData}
        columns={columns}
        autoHeight
        checkboxSelection
        onRowClick={(params) => viewArtwork(params)}
      />
    </Container>
  );
}

export default GalleryPage;
