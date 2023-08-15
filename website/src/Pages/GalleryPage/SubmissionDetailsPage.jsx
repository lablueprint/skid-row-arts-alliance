import {
  Box, Typography, Select, MenuItem, TextField, Button, FormControl,
} from '@mui/material';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function SubmissionDetailsPage() {
  const { authHeader } = useSelector((state) => state.sliceAuth);
  const location = useLocation();
  const {
    id,
  } = location.state;

  const [details, setDetails] = useState({
    mediaData: [''],
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

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F8F8F8' }}>
      <Box sx={{
        width: '60%', marginLeft: '5%', marginTop: '5%', marginBottom: '5%', marginRight: '1%', padding: '2%', backgroundColor: '#FFFFFF',
      }}
      >
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h6">
            Submission Details
          </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            { (edit) ? (
              <>
              </>
            ) : (
              <Button sx={{ backgroundColor: '#4C4C9B' }} onClick={() => setEdit(true)} variant="contained">Edit</Button>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ width: 200, height: 30 }}>
            Date Submitted:
          </Typography>
          <Typography>
            {details.date}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ width: 200, height: 30 }}>
            Art Title:
          </Typography>
          {(edit) ? (
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <Typography>
              {title}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ width: 200, height: 30 }}>
            Uploader:
          </Typography>
          <Typography>
            {details.uploader}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ width: 200, height: 30 }}>
            Email:
          </Typography>
          <Typography>
            {details.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ width: 200, height: 30 }}>
            Description:
          </Typography>
          {(edit) ? (
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <Typography>
              {description}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ width: 200, height: 30 }}>
            Media Type:
          </Typography>
          <Typography>
            {details.mediaTypes.map((type) => (
              <Typography>{type}</Typography>
            ))}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ width: 200, height: 30 }}>
            Tags:
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {details.tags.map((tag) => (
              <Typography sx={{ marginRight: 1 }}>{tag}</Typography>
            ))}
          </Box>
        </Box>
        <Box>
          {details.mediaData.map((media) => (
          // TODO: adjust the rendering for each type of media
            <img style={{ height: 300, width: 300 }} src={media.MediaURL} alt={media.ContentType} />
          ))}
        </Box>
        <Box>
          {!edit ? (
            <>
            </>
          ) : (
            <Box>
              <Button
                variant="outlined"
                sx={{ color: '#4C4C9B', borderColor: '#4C4C9B' }}
                onClick={() => {
                  handleEditCancel();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#4C4C9B' }}
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
        width: '30%', marginRight: '5%', marginTop: '5%', marginBottom: '5%', marginLeft: '1%', padding: '2%', backgroundColor: '#FFFFFF',
      }}
      >
        <Box sx={{ display: 'flex' }}>
          <Typography>
            Status:
          </Typography>
          <Typography>
            {details.status}
          </Typography>
        </Box>
        <Typography>
          Action
        </Typography>
        <Box>
          <FormControl fullWidth>
            <Select
              value={action}
              defaultValue={action}
              onChange={(e) => {
                setAction(e.target.value);
              }}
              disabled={!change}
            >
              <MenuItem value="Approve">Approve</MenuItem>
              <MenuItem value="Reject">Reject</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Typography>Comments</Typography>
          <TextField
            fullWidth
            value={comments}
            InputProps={{
              readOnly: !change,
            }}
            onChange={(e) => setComments(e.target.value)}
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
                  sx={{ backgroundColor: '#4C4C9B' }}
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
