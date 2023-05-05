import { React, useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GalleryPage() {
  const navigate = useNavigate();
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
    const data = response.data.map((submission, index) => (
      {
        id: index,
        'Submission Title': submission.SubmissionData.title,
        Uploader: submission.SubmissionData.name,
        Status: submission.SubmissionData.status,
        Category: 'Image',
        Date: submission.SubmissionData.date,
        description: submission.SubmissionData.description,
        types: ['Image'],
        tags: submission.SubmissionData.tags,
        comments: submission.SubmissionData.comments,
      }));
    setSubmissionData(data);
  };

  useEffect(() => {
    getSubmissionData();
  }, []);

  const viewArtwork = (params) => {
    const index = params.id;
    console.log(submissionData[index]);
    navigate('/submission', {
      state: {
        status: submissionData[index].Status,
        title: submissionData[index]['Submission Title'],
        uploader: submissionData[index].Uploader,
        description: submissionData[index].description,
        types: submissionData[index].types,
        tags: submissionData[index].tags,
        date: submissionData[index].Date,
        comments: submissionData[index].comments,
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
