import {
  Box, Button, TextField, Typography,
} from '@mui/material';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ZineDetailsPage() {
  const location = useLocation();
  const {
    id,
  } = location.state;
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    url: '',
    title: '',
    season: '',
    year: '',
    contents: [{
      sectionTitle: '',
      sectionPage: '',
    }],
  });
  const [title, setTitle] = useState('');
  const [season, setSeason] = useState('');
  const [year, setYear] = useState('');
  const [contents, setContents] = useState([]);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(0);

  const getZineDetails = async () => {
    const zine = await axios.get(`http://localhost:4000/zine/getzine/${id}`);
    setDetails({
      url: zine.data.url,
      title: zine.data.title,
      season: zine.data.season,
      year: zine.data.year,
      contents: zine.data.contents,
    });
    setTitle(zine.data.title);
    setSeason(zine.data.season);
    setYear(zine.data.year);
    setContents(zine.data.contents);
  };

  useEffect(() => {
    getZineDetails();
  }, [update]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:4000/zine/delete/${id}`);
    navigate('/zines');
  };

  const handleDeleteSection = (index) => {
    const newContents = [...contents.slice(0, index), ...contents.slice(index + 1)];
    setContents(newContents);
  };

  const handleEditSection = (index, value, part) => {
    const updatedContents = [...contents];
    if (part === 'Chapter') {
      updatedContents[index].sectionTitle = value;
    } else {
      updatedContents[index].sectionPage = value;
    }
    setContents(updatedContents);
  };

  const handleAddSection = () => {
    setContents([...contents, { sectionTitle: '', sectionPage: '' }]);
  };

  const handleCancel = async () => {
    setTitle(details.title);
    setSeason(details.season);
    setYear(details.year);
    setContents(details.contents);
    setEdit(false);
  };

  const handleSave = async () => {
    // TODO: handle edge case where someone adds a bunch of empty slots
    await axios.patch(`http://localhost:4000/zine/update/${id}`, {
      title,
      season,
      year,
      contents,
    });
    setUpdate((val) => val + 1);
    setEdit(false);
  };

  return (
    <Box sx={{ backgroundColor: '#C4C8CA' }}>
      <Box sx={{ backgroundColor: '#FFFFFF', margin: '3%' }}>
        <Box sx={{ display: 'flex' }}>
          <Box>
            <Typography variant="h5">
              Zine Title
            </Typography>
            {edit ? (
              <TextField
                sx={{ width: 400 }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <Typography variant="h6">
                {details.title}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            {edit ? (
              <>
              </>
            ) : (
              <Box>
                <Button variant="contained" onClick={() => setEdit(true)}>
                  Edit
                </Button>
                <Button variant="contained" onClick={() => handleDelete()}>
                  Delete
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        <Box>
          <Typography>
            Edition
          </Typography>
          {edit ? (
            <Box>
              <TextField
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              />
              <TextField
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Box>
          ) : (
            <Typography>
              {details.season}
              {' '}
              {details.year}
            </Typography>
          )}
        </Box>
        <Box>
          <Box>
            <Typography variant="h6">
              Table of Contents
            </Typography>
          </Box>
          <Box>
            {edit ? (
              <Box>
                {contents.map((section, index) => (
                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <Typography>
                        Chapter
                      </Typography>
                      <TextField
                        sx={{ width: 600, height: 30 }}
                        value={section.sectionTitle}
                        onChange={(e) => handleEditSection(index, e.target.value, 'Chapter')}
                      />
                    </Box>
                    <Box>
                      <Typography>
                        Page
                      </Typography>
                      <TextField
                        value={section.sectionPage}
                        onChange={(e) => handleEditSection(index, e.target.value, 'Page')}
                      />
                    </Box>
                    <Box>
                      <Button onClick={() => handleDeleteSection(index)}>Delete</Button>
                    </Box>
                  </Box>
                ))}
                <Button
                  onClick={() => handleAddSection()}
                >
                  Add More Chapters +
                </Button>
              </Box>
            ) : (
              <Box>
                {contents.map((section) => (
                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <Typography sx={{ width: 600, height: 30 }}>
                        {section.sectionTitle}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography>
                        {section.sectionPage}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
        <Box>
          <object aria-label="zine pdf" data={details.url} type="application/pdf" height="800" width="80%" />
        </Box>
        <Box>
          {edit ? (
            <Box>
              <Button
                variant="outlined"
                sx={{ color: '#4C4C9B', borderColor: '#4C4C9B' }}
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#4C4C9B' }}
                onClick={() => handleSave()}
              >
                Save
              </Button>
            </Box>
          ) : (
            <>
            </>
          )}
        </Box>
      </Box>
    </Box>

  );
}

export default ZineDetailsPage;
