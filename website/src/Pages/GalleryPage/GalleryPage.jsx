import { React } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function GalleryPage() {
  const columns = [
    { field: 'Submission Title', width: 200 },
    { field: 'Uploader' },
    { field: 'Status' },
    { field: 'Category' },
    { field: 'Date' }];
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
      'Submission Title': 'Taco Tuesday',
      Uploader: 'Isaac Wen',
      Status: 'Incomplete',
      Category: 'Image',
      Date: '02/01/23',
    },
  ];

  return (
    <div style={{ width: '70%' }}>
      <header>Gallery Page</header>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        checkboxSelection
      />
    </div>
  );
}

export default GalleryPage;
