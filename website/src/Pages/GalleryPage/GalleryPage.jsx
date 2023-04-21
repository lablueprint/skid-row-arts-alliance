import { React, useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function GalleryPage() {
  const [submissionData, setSubmissionData] = useState([]);

  // TODO: further styling needed for pagination
  const columns = [
    { field: 'Submission Title', width: 200 },
    { field: 'Uploader', width: 150 },
    { field: 'Status' },
    { field: 'Category' },
    { field: 'Date' }];

  const getSubmissionData = async () => {
    const response = await axios.get('http://localhost:4000/submissions/get');
    console.log(response.data);
    const data = response.data.map((submission, index) => (
      {
        id: index,
        'Submission Title': submission.SubmissionData.title,
        Uploader: submission.SubmissionData.name,
        // TODO: replace with submission.status once the model is updated
        Status: 'Incomplete',
        // TODO: replace with submission.type, figure out how to parse it later
        Category: 'Image',
        // TODO: replace with submission.date once the model is updated
        Date: '02/01/2023',
      }));
    setSubmissionData(data);
  };

  useEffect(() => {
    getSubmissionData();
  }, []);

  return (
    <Container>
      <Typography variant="h5">Recent Submissions</Typography>
      <DataGrid
        rows={submissionData}
        columns={columns}
        autoHeight
        checkboxSelection
      />
    </Container>
  );
}

export default GalleryPage;
