import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, ScrollView, Image, Switch,
} from 'react-native';
import VideoPlayer from 'expo-video-player';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import AudioPlayer from '../Components/AudioPlayer';

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
  },
  square: {
    width: 40,
    height: 40,
    backgroundColor: '#D9D9D9',
    margin: 40,
  },
});

function ArtworkDetailScreen({
  route,
}) {
  const {
    id,
  } = route.params;
  const [submission, setSubmission] = useState({});
  const [allMediaData, setAllMediaData] = useState([]);
  const [loadImages, setLoadImages] = useState(false);
  const [isArtSaved, setIsArtSaved] = useState(false);

  const getSubmission = async () => {
    try {
      setLoadImages(false);
      const res = await axios.get(`${URL}/submissions/getsubmission`, { params: { id } });
      setSubmission(res.data.Submission);
      setAllMediaData(res.data.MediaData);
      return res.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadImages(true);
    }
  };

  const getSavedArt = async () => {
    try {
      const res = await axios.get(`${URL}/user/getArtwork/63e33e2f578ad1d80bd2a347`);
      if ((res.data.msg[0].savedArtwork.find((elm) => elm === id.toString())) === undefined) {
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const addSavedArt = async (artId) => {
    try {
      const res = await axios.patch(`${URL}/user/addArtwork/63e33e2f578ad1d80bd2a347`, [artId]);
      setIsArtSaved(true);
      return res;
    } catch (err) {
      return err;
    }
  };

  const removeSavedArt = async (artId) => {
    try {
      const res = await axios.patch(`${URL}/user/removeArtwork/63e33e2f578ad1d80bd2a347`, [artId]);
      setIsArtSaved(false);
      return res;
    } catch (err) {
      return err;
    }
  };

  const onPressToggleSavedArt = () => {
    if (isArtSaved) {
      removeSavedArt(id);
    } else {
      addSavedArt(id);
    }
  };

  useEffect(() => {
    getSavedArt().then((status) => setIsArtSaved(status));
    getSubmission();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
        Title:
        {submission.title}
      </Text>
      <Switch value={isArtSaved} onValueChange={onPressToggleSavedArt} title="Art Save Button" />
      <Text>
        Name:
        {submission.name}
        {'\n'}
        Description:
        {submission.description}
        {'\n'}
        Email:
        {submission.email}
      </Text>
      {
        loadImages ? (
          <>
            {
              allMediaData.map((mediaData) => {
                const type = mediaData.ContentType.split('/')[0];
                if (type === 'image') {
                  return (
                    <Image
                      style={{ width: 200, height: 200 }}
                      source={{ uri: mediaData.MediaURL }}
                    />
                  );
                }
                if (type === 'video') {
                  return (
                    <VideoPlayer
                      videoProps={{
                        shouldPlay: false,
                        source: {
                          uri: mediaData.MediaURL,
                        },
                      }}
                    />
                  );
                }
                if (type === 'audio') {
                  return (
                    <AudioPlayer
                      source={mediaData.MediaURL}
                    />
                  );
                }
                return (
                  <Text>Unsupported media type</Text>
                );
              })
            }
          </>
        ) : <Text>Loading</Text>
      }
    </ScrollView>
  );
}

ArtworkDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired,
      Encoding: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ArtworkDetailScreen;
