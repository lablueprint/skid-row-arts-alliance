import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, ScrollView, Image,
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

  const getSubmission = async () => {
    // setLoadImages(false);
    try {
      const res = await axios.get(`${URL}/artgallery/getsubmission`, { params: { id } });
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

  useEffect(() => {
    getSubmission();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
        Title:
        {submission.title}
      </Text>
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
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ArtworkDetailScreen;
