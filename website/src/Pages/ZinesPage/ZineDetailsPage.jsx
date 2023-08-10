import {
  Box, Button, FormControl, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import './ZineDetailsPage.css';
import '../../fonts/Montserrat.css';
import editIcon from '../../assets/editIcon.png';
import deleteIcon from '../../assets/deleteIcon.png';
import tocDeleteIcon from '../../assets/tocDeleteIcon.png';

function ZineDetailsPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);

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
  const [year, setYear] = useState(dayjs());
  const [contents, setContents] = useState([]);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(0);

  const getZineDetails = async () => {
    const zine = await axios.get(`http://localhost:4000/zine/getzine/${id}`, {
      headers: authHeader,
    });
    setDetails({
      url: zine.data.url,
      title: zine.data.title,
      season: zine.data.season,
      year: zine.data.year,
      contents: zine.data.contents,
    });
    setTitle(zine.data.title);
    setSeason(zine.data.season);
    setYear(dayjs(zine.data.year));
    setContents(zine.data.contents);
  };

  useEffect(() => {
    getZineDetails();
  }, [update]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:4000/zine/delete/${id}`, {
      headers: authHeader,
    });
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
      year: String(year.year()),
      contents,
    }, {
      headers: authHeader,
    });
    setUpdate((val) => val + 1);
    setEdit(false);
  };

  const goBacktoZines = () => {
    navigate('/zines');
  };

  return (
    <Box>
      <button type="button" className="back-to-zines-button" onClick={goBacktoZines}>
        {'<'}
        {' '}
        Back to Zines
      </button>
      <Box sx={{
        backgroundColor: '#FFFFFF', m: '2% 5% 5% 5%', p: '3%', border: '1px solid #E7E9EC', borderRadius: 3, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
      }}
      >
        <Box>
          {edit ? <h1 className="zine-details-title">Edit Zine Info</h1>
            : (
              <>
              </>
            )}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box>
            {edit ? (
              <div>
                <p className="zine-details-field-label">Zine Title</p>
                <TextField
                  sx={{ width: 400 }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  inputProps={{
                    style: {
                      fontFamily: 'Montserrat-Regular',
                      color: '#53595C',
                      border: '0.75px solid #8A9195',
                      borderRadius: '5px',
                      backgroundColor: '#F8F8F8',
                    },
                  }}
                />
              </div>
            ) : (
              <h1 className="zine-details-title">
                {details.title}
              </h1>
            )}
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            {edit ? (
              <>
              </>
            ) : (
              <Box>
                <button type="button" className="edit-delete-button" onClick={() => setEdit(true)}>
                  <img src={editIcon} alt="Pencil icon" className="edit-delete-icons" />
                  <p className="edit-delete-text">Edit</p>
                </button>
                <button type="button" className="edit-delete-button" onClick={() => handleDelete()}>
                  <img src={deleteIcon} alt="Trash can icon" className="edit-delete-icons" />
                  <p className="edit-delete-text">Delete</p>
                </button>
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ mb: 8 }}>
          {edit ? (
            <Box sx={{ display: 'flex', mt: 2 }}>
              <Box sx={{ mr: 5 }}>
                <p className="zine-details-field-label">Season</p>
                <FormControl fullWidth sx={{ backgroundColor: '#F8F8F8' }}>
                  <Select
                    value={season}
                    onChange={(e) => {
                      setSeason(e.target.value);
                    }}
                    sx={{ fontFamily: 'Montserrat-Regular', color: '#53595C' }}
                  >
                    <MenuItem value="Summer" sx={{ fontFamily: 'Montserrat-Regular', color: '#53595C' }}>Summer</MenuItem>
                    <MenuItem value="Fall" sx={{ fontFamily: 'Montserrat-Regular', color: '#53595C' }}>Fall</MenuItem>
                    <MenuItem value="Winter" sx={{ fontFamily: 'Montserrat-Regular', color: '#53595C' }}>Winter</MenuItem>
                    <MenuItem value="Spring" sx={{ fontFamily: 'Montserrat-Regular', color: '#53595C' }}>Spring</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <p className="zine-details-field-label">Year</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={['year']}
                    value={year}
                    onChange={(newYear) => setYear(newYear)}
                    sx={{ backgroundColor: '#F8F8F8', fontFamily: 'Montserrat-Regular', color: '#53595C' }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          ) : (
            <h2 className="zine-details-season-year">
              {details.season}
              {' '}
              {details.year}
            </h2>
          )}
        </Box>
        <Box>
          <Box>
            <h3 className="table-of-contents">
              Table of Contents
            </h3>
          </Box>
          <Box sx={{ mb: 5 }}>
            {edit ? (
              <Box>
                {contents.map((section, index) => (
                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <p className="zine-details-field-label">
                        Chapter
                      </p>
                      <TextField
                        sx={{ width: 620, height: 30, mr: 5 }}
                        value={section.sectionTitle}
                        onChange={(e) => handleEditSection(index, e.target.value, 'Chapter')}
                        inputProps={{
                          style: {
                            fontFamily: 'Montserrat-Regular',
                            color: '#53595C',
                            border: '0.75px solid #8A9195',
                            borderRadius: '5px',
                            backgroundColor: '#F8F8F8',
                            overflow: 'hidden',
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <p className="zine-details-field-label">
                        Page
                      </p>
                      <TextField
                        value={section.sectionPage}
                        onChange={(e) => handleEditSection(index, e.target.value, 'Page')}
                        inputProps={{
                          style: {
                            fontFamily: 'Montserrat-Regular',
                            color: '#53595C',
                            border: '0.75px solid #8A9195',
                            borderRadius: '5px',
                            backgroundColor: '#F8F8F8',
                            textAlign: 'center',
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <button type="button" className="toc-delete-icon-container" onClick={() => handleDeleteSection(index)}><img src={tocDeleteIcon} alt="Trash can icon" className="toc-delete-icon" /></button>
                    </Box>
                  </Box>
                ))}
                <Button
                  onClick={() => handleAddSection()}
                  variant="contained"
                  sx={{
                    mt: 4,
                    p: 2,
                    width: '80%',
                    fontFamily: 'Montserrat-Medium',
                    backgroundColor: '#4C4C9B',
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#262652',
                    },
                  }}
                >
                  Add More Chapters +
                </Button>
              </Box>
            ) : (
              <Box sx={{ mt: 5 }}>
                {contents.map((section) => (
                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <Typography sx={{
                        width: 600, height: 30, fontFamily: 'Montserrat-Regular', color: '#53595C', mb: 2,
                      }}
                      >
                        {section.sectionTitle}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontFamily: 'Montserrat-Regular', color: '#53595C' }}>
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
            <Box sx={{ mt: 4 }}>
              <Button
                variant="outlined"
                sx={{
                  color: '#4C4C9B', borderColor: '#4C4C9B', mr: 2, width: '10%', fontFamily: 'Montserrat-Medium', textTransform: 'none',
                }}
                onClick={() => {
                  handleCancel();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#4C4C9B',
                  width: '10%',
                  fontFamily: 'Montserrat-Medium',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#262652',
                  },
                }}
                onClick={() => {
                  handleSave();
                }}
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
