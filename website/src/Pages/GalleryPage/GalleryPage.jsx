import { React } from 'react';
import { Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function GalleryPage() {
  const columns = [
    { field: 'Submission Title', width: 200 },
    { field: 'Uploader', width: 150 },
    { field: 'Status' },
    { field: 'Category' },
    { field: 'Date' }];

  // TODO: replace by pulling from the database and
  // format it to following the structure of the table
  const rows = [
    {
      id: 1,
      'Submission Title': 'Taco Tuesday',
      Uploader: 'Isaac Wen',
      Status: 'Incomplete',
      Category: 'Image',
      Date: '02/01/23',
    },
    {
      id: 2,
      'Submission Title': 'Still Life Study',
      Uploader: 'James He',
      Status: 'Incomplete',
      Category: 'Video',
      Date: '02/01/23',
    },
    {
      id: 3,
      'Submission Title': 'My Best Friend and I',
      Uploader: 'Siddharth Nandy',
      Status: 'Rejected',
      Category: 'Image',
      Date: '02/01/23',
    },
    {
      id: 4,
      'Submission Title': 'Classical Music Practice',
      Uploader: 'Diya Indoliya',
      Status: 'Approved',
      Category: 'Audio',
      Date: '02/01/23',
    },
  ];

  return (
    <Container>
      <Typography variant="h5">Recent Submissions</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        checkboxSelection
      />
    </Container>
  );
}

export default GalleryPage;
