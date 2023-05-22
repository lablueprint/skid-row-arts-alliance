import {
  Box, Typography, Select, MenuItem, TextField, Button, FormControl,
} from '@mui/material';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SubmissionDetailsPage() {
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
    const artwork = await axios.get('http://localhost:4000/submissions/getartwork', { params: { id } });
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
    await axios.patch(`http://localhost:4000/submissions/updatesubmission/${id}`, {
      title,
      description,
    });
    setUpdate((val) => val + 1);
    setEdit(false);
  };

  const handleSubmit = async () => {
    let formatStatus = 'Approved';
    if (action === 'Reject') {
      formatStatus = 'Rejected';
    }
    await axios.patch(`http://localhost:4000/submissions/updatesubmission/${id}`, {
      status: formatStatus,
      comments,
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
    await axios.patch(`http://localhost:4000/submissions/updatesubmission/${id}`, {
      title,
      description,
      status: formatStatus,
      comments,
    });
    setUpdate((val) => val + 1);
    setChange(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <Box>
          <Typography>
            Submission Details
          </Typography>
          <Box>
            { (edit) ? (
              <>
              </>
            ) : (
              <Button onClick={() => setEdit(true)}>Edit</Button>
            )}
          </Box>
        </Box>
        <Box>
          <Typography>
            Status:
          </Typography>
          <Typography>
            {details.status}
          </Typography>
        </Box>
        <Box>
          <Typography>
            Date Submitted:
          </Typography>
          <Typography>
            {details.date}
          </Typography>
        </Box>
        <Box>
          <Typography>
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
        <Box>
          <Typography>
            Uploader:
          </Typography>
          <Typography>
            {details.uploader}
          </Typography>
        </Box>
        <Box>
          <Typography>
            Email:
          </Typography>
          <Typography>
            {details.email}
          </Typography>
        </Box>
        <Box>
          <Typography>
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
        <Box>
          <Typography>
            Media Type:
          </Typography>
          <Typography>
            {details.mediaTypes.map((type) => (
              <Typography>{type}</Typography>
            ))}
          </Typography>
        </Box>
        <Box>
          <Typography>
            Tags:
          </Typography>
          <Typography>
            {details.tags.map((tag) => (
              <Typography>{tag}</Typography>
            ))}
          </Typography>
        </Box>
        <Box>
          {details.mediaData.map((media) => (
          // TODO: adjust the rendering for each type of media
            <img src={media.MediaURL} alt={media.ContentType} />
          ))}
        </Box>
        <Box>
          {!edit ? (
            <>
            </>
          ) : (
            <Box>
              <Button onClick={() => {
                handleEditCancel();
              }}
              >
                Cancel
              </Button>
              <Button onClick={() => {
                handleEditSave();
              }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Box>
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
              <Button onClick={() => {
                setChange(true);
              }}
              >
                Change
              </Button>
            </Box>
          ) : (
            <Box>
              {details.status === 'Incomplete' ? (
                <Button onClick={() => {
                  handleSubmit();
                }}
                >
                  Submit
                </Button>
              ) : (
                <Box>
                  <Button onClick={() => {
                    handleChangeCancel();
                  }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => {
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
