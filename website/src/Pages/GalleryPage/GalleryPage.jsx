import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../redux/sliceAuth';

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

  const { id, token } = useSelector((state) => state.sliceAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenExpired(token) || !id || !token) {
      navigate('/');
    }
  }, [id, token]);

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
