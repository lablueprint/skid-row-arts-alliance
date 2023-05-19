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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [comments, setComments] = useState('');

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
    setStatus(artwork.data.Submission.status);
    setComments(artwork.data.Submission.comments);
  };

  useEffect(() => {
    getSubmissionDetails();
  }, []);

  // TODO: tag additions for a post

  const handleCancel = () => {
    setTitle(details.title);
    setDescription(details.description);
    setStatus(details.status);
    setComments(details.comments);
    setEdit(false);
  };

  const handleSave = async () => {
    // TODO: pop up message for the approval or switching of status
    // TODO: update the backend by creating a route to update status
    setEdit(false);
  };

  return (
    <Box>
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
              {details.title}
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
              {details.description}
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
      </Box>
      <Box>
        <Typography>
          Status
        </Typography>
        <Box>
          <FormControl fullWidth>
            <Select
              value={status}
              defaultValue={status}
              onChange={(e) => {
                if (edit) {
                  setStatus(e.target.value);
                }
              }}
            >
              <MenuItem value="Incomplete">Incomplete</MenuItem>
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
              readOnly: !edit,
            }}
            onChange={(e) => setComments(e.target.value)}
          />
        </Box>
        <Box>
          {!edit ? (
            <>
            </>
          ) : (
            <Box>
              <Button onClick={() => {
                handleCancel();
              }}
              >
                Cancel
              </Button>
              <Button onClick={() => {
                handleSave();
              }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default SubmissionDetailsPage;
