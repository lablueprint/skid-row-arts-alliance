import {
  Box, Select, MenuItem, TextField, Button, FormControl,
} from '@mui/material';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './SubmissionDetailsPage.css';
import '../../fonts/Montserrat.css';
import imgIcon from '../../assets/imgIcon.png';
import vidIcon from '../../assets/vidIcon.png';
import audIcon from '../../assets/audIcon.png';
import incompleteDot from '../../assets/incompleteDot.png';
import rejectedDot from '../../assets/rejectedDot.png';
import approvedDot from '../../assets/approvedDot.png';
import editIcon from '../../assets/editIcon.png';
import MediaRenderer from './MediaRenderer';

function SubmissionDetailsPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);
  const location = useLocation();
  const {
    id,
  } = location.state;
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    mediaData: null,
    status: '',
    title: '',
    uploader: '',
    description: '',
    mediaTypes: [''],
    tags: [''],
    date: '',
    comments: '',
  });
  const [edit, setEdit] = useState(false);
  const [change, setChange] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [action, setAction] = useState('');
  const [comments, setComments] = useState('');
  const [update, setUpdate] = useState(0);

  const getSubmissionDetails = async () => {
    const artwork = await axios.get(`${process.env.REACT_APP_SERVER_URL}/submissions/getartwork/${id}`, {
      headers: authHeader,
    });
    setDetails({
      mediaData: artwork.data.MediaData,
      status: artwork.data.Submission.status,
      title: artwork.data.Submission.title,
      uploader: artwork.data.Submission.name,
      email: artwork.data.Submission.email,
      description: artwork.data.Submission.description,
      mediaTypes: artwork.data.Submission.mediaTypes,
      tags: artwork.data.Submission.tags,
      date: artwork.data.Submission.date,
      comments: artwork.data.Submission.comments,
    });
    setTitle(artwork.data.Submission.title);
    setDescription(artwork.data.Submission.description);
    if (artwork.data.Submission.status === 'Incomplete') {
      setChange(true);
      setAction(artwork.data.Submission.status);
    } else if (artwork.data.Submission.status === 'Approved') {
      setAction('Approve');
    } else {
      setAction('Reject');
    }
    setComments(artwork.data.Submission.comments);
  };

  useEffect(() => {
    getSubmissionDetails();
  }, [update]);

  const backToGallery = () => {
    navigate('/');
  };

  const handleEditCancel = () => {
    setTitle(details.title);
    setDescription(details.description);
    setEdit(false);
  };

  const handleEditSave = async () => {
    // TODO: pop up message for the approval or switching of status
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/submissions/updatesubmission/${id}`, {
      title,
      description,
    }, {
      headers: authHeader,
    });
    setUpdate((val) => val + 1);
    setEdit(false);
  };

  const handleSubmit = async () => {
    let formatStatus = 'Approved';
    if (action === 'Reject') {
      formatStatus = 'Rejected';
    }
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/submissions/updatesubmission/${id}`, {
      status: formatStatus,
      comments,
    }, {
      headers: authHeader,
    });
    setChange(false);
  };

  const handleChangeCancel = () => {
    setAction('');
    setComments(details.comments);
    setChange(false);
  };

  const handleChangeSave = async () => {
    // TODO: pop up message for the approval or switching of status
    let formatStatus = 'Approved';
    if (action === 'Reject') {
      formatStatus = 'Rejected';
    }
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/submissions/updatesubmission/${id}`, {
      title,
      description,
      status: formatStatus,
      comments,
    }, {
      headers: authHeader,
    });
    setUpdate((val) => val + 1);
    setChange(false);
  };

  const handleDelete = async () => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/submissions/deletesubmission/${id}`, {
      headers: authHeader,
    });
    backToGallery();
  };

  const mediaTypeIconMap = {
    image: <img src={imgIcon} alt="Pic icon" className="media-type-icon" />,
    video: <img src={vidIcon} alt="Video icon" className="media-type-icon" />,
    audio: <img src={audIcon} alt="Audio icon" className="media-type-icon" />,
  };

  const getStatusImage = (status) => {
    switch (status) {
      case 'Approved':
        return approvedDot;
      case 'Incomplete':
        return incompleteDot;
      case 'Rejected':
        return rejectedDot;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F8F8F8' }}>
      <Box>
        <Box>
          <Button onClick={() => backToGallery()}>
            Back to Gallery
          </Button>
        </Box>
        <Box>
          <Button onClick={() => handleDelete()}>
            Delete Submission
          </Button>
        </Box>
      </Box>
      <Box sx={{
        width: '60%', marginLeft: '5%', marginTop: '5%', marginBottom: '5%', marginRight: '1%', padding: '4%', backgroundColor: '#FFFFFF', boxShadow: 1, borderRadius: 2,
      }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <h1 className="title">
            Submission Details
          </h1>
          <Box sx={{ marginLeft: 'auto' }}>
            {edit ? (
              <>
              </>
            ) : (
              <button type="button" onClick={() => setEdit(true)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                <img src={editIcon} alt="Pencil" className="edit-icon" />
              </button>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <p className="details-label">
            Date Submitted:
          </p>
          <p className="details-text">
            {details.date}
          </p>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <p className="details-label">
            Art Title:
          </p>
          {(edit) ? (
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              inputProps={{
                style: {
                  color: '#53595C',
                  border: '0.75px solid #8A9195',
                  borderRadius: '5px',
                  backgroundColor: '#F8F8F8',
                },
              }}
            />
          ) : (
            <p className="details-text">
              {title}
            </p>
          )}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <p className="details-label">
            Uploader:
          </p>
          <p className="details-text">
            {details.uploader}
          </p>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <p className="details-label">
            Email:
          </p>
          <p className="details-text">
            {details.email}
          </p>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <p className="details-label">
            Description:
          </p>
          {(edit) ? (
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              inputProps={{
                style: {
                  color: '#53595C',
                  border: '0.75px solid #8A9195',
                  borderRadius: '5px',
                  backgroundColor: '#F8F8F8',
                },
              }}
            />
          ) : (
            <p className="details-text">
              {description}
            </p>
          )}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <p className="details-label">
            Media Type:
          </p>
          <div className="media-type-container">
            {details.mediaTypes.map((type) => (
              <div className="media-type-item">
                {mediaTypeIconMap[type]}
                <p className="media-type-text">{type}</p>
              </div>
            ))}
          </div>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <p className="details-label">
            Tags:
          </p>
          <div className="tags-container">
            {details.tags.map((tag) => (
              <p className="tag">{tag}</p>
            ))}
          </div>
        </Box>
        <MediaRenderer details={details} />
        <Box>
          {!edit ? (
            <>
            </>
          ) : (
            <Box>
              <Button
                variant="outlined"
                sx={{
                  color: '#4C4C9B', borderColor: '#4C4C9B', mr: 2, width: '17%', fontFamily: 'Montserrat-Medium', textTransform: 'none',
                }}
                onClick={() => {
                  handleEditCancel();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#4C4C9B',
                  width: '17%',
                  fontFamily: 'Montserrat-Medium',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#262652',
                  },
                }}
                onClick={() => {
                  handleEditSave();
                }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{
        width: '30%', marginRight: '5%', marginTop: '5%', marginBottom: '5%', marginLeft: '1%', padding: '4%', backgroundColor: '#FFFFFF', boxShadow: 1, borderRadius: 2,
      }}
      >
        <Box sx={{ display: 'flex' }}>
          <p className="details-label">
            Status:
          </p>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={getStatusImage(details.status)}
              alt={details.status}
              style={{ marginRight: '0.5rem', width: '12px', height: '12px' }}
            />
            <p className="details-text">
              {details.status}
            </p>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <p className="details-label">
            Action:
          </p>
          <Box>
            <FormControl fullWidth>
              <Select
                value={action}
                defaultValue={action}
                onChange={(e) => {
                  setAction(e.target.value);
                }}
                disabled={!change}
                sx={{
                  minWidth: 200, fontFamily: 'Montserrat-Regular, sans-serif',
                }}
                size="small"
              >
                <MenuItem value="Approve" sx={{ fontFamily: 'Montserrat-Regular, sans-serif' }}>Approve</MenuItem>
                <MenuItem value="Reject" sx={{ fontFamily: 'Montserrat-Regular, sans-serif' }}>Reject</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box>
          <p className="details-label">Comments:</p>
          <TextField
            fullWidth
            multiline
            value={comments}
            InputProps={{
              readOnly: !change,
            }}
            onChange={(e) => setComments(e.target.value)}
            sx={{ mb: 5 }}
          />
        </Box>
        <Box>
          {!change ? (
            <Box>
              <Button
                sx={{ backgroundColor: '#4C4C9B' }}
                variant="contained"
                onClick={() => {
                  setChange(true);
                }}
              >
                Revise
              </Button>
            </Box>
          ) : (
            <Box>
              {details.status === 'Incomplete' ? (
                <Button
                  sx={{
                    backgroundColor: '#4C4C9B',
                    fontFamily: 'Montserrat-Medium',
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#262652',
                    },
                    pl: 3,
                    pr: 3,
                  }}
                  variant="contained"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Box>
                  <Button
                    variant="outlined"
                    sx={{ color: '#4C4C9B', borderColor: '#4C4C9B' }}
                    onClick={() => {
                      handleChangeCancel();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#4C4C9B' }}
                    onClick={() => {
                      handleChangeSave();
                    }}
                  >
                    Save
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default SubmissionDetailsPage;
