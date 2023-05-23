/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Image, Switch, Button,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Card } from 'react-native-paper';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import VideoPlayer from 'expo-video-player';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
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
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedArtCard: {
    borderRadius: 20,
    marginRight: 15,
  },
  userArtTitle: {
    fontFamily: 'MontserratMedium',
    fontSize: 18,
    paddingTop: 70,
  },
  userArtContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
});

function ArtworkDetailScreen({
  route,
}) {
  const {
    artworkId,
  } = route.params;
  const [submission, setSubmission] = useState({});
  const [allMediaData, setAllMediaData] = useState([]);
  const [loadImages, setLoadImages] = useState(false);
  const [isArtSaved, setIsArtSaved] = useState(false);
  const { id, authHeader } = useSelector((state) => state.auth);

  const [loadSavedArt, setLoadSavedArt] = useState(false);
  const [savedArt, setSavedArt] = useState([]);
  const [loadAllThumnails, setLoadAllThumbnails] = useState(false);
  const [allThumbnails, setAllThumbnails] = useState([]);

  const handleShare = async (mediaUrl) => {
    try {
      const fileName = mediaUrl.substring(mediaUrl.lastIndexOf('/') + 1);
      const fileUri = `${FileSystem.cacheDirectory}${Date.now()}${fileName}`;
      const downloadObject = FileSystem.createDownloadResumable(mediaUrl, fileUri);
      const { uri } = await downloadObject.downloadAsync();
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
    }
  };

  const getSubmission = async () => {
    try {
      setLoadImages(false);
      const res = await axios.get(`${URL}/submissions/getsubmission/${artworkId}`, {
        headers: authHeader,
      });
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
      const res = await axios.get(`${URL}/user/getArtwork/${id}`, {
        headers: authHeader,
      });
      if ((res.data.msg[0].savedArtwork.find((e) => e === artworkId.toString())) === undefined) {
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const addSavedArt = async () => {
    try {
      const res = await axios.patch(`${URL}/user/addArtwork/${id}`, [artworkId], {
        headers: authHeader,
      });
      setIsArtSaved(true);
      return res;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const removeSavedArt = async () => {
    try {
      const res = await axios.patch(`${URL}/user/removeArtwork/${id}`, [artworkId], {
        headers: authHeader,
      });
      setIsArtSaved(false);
      return res;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const onPressToggleSavedArt = () => {
    if (isArtSaved) {
      removeSavedArt();
    } else {
      addSavedArt();
    }
  };

  const findThumbnail = (artID) => {
    const artInfo = {
      thumbNail: 'No Tag',
    };
    if (loadAllThumnails) {
      allThumbnails.forEach((thumbnail) => {
        if (thumbnail.SubmissionId === artID) {
          artInfo.thumbNail = (thumbnail.ImageURL);
        }
      });
    }
    return artInfo.thumbNail;
  };

  const getOtherArtwork = async () => {
    try {
      setLoadSavedArt(false);
      const res = await axios.get(`${URL}/user/getUser/${id}`, {
        headers: authHeader,
      });
      setSavedArt(res.data.msg.userArtwork);
      return res;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadSavedArt(true);
    }
  };

  const getThumbnails = async () => {
    try {
      setLoadAllThumbnails(false);
      const result = await axios.get(`${URL}/submissions/getthumbnails`, {
        headers: authHeader,
      });
      setAllThumbnails(result.data);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadAllThumbnails(true);
    }
  };

  useEffect(() => {
    getSavedArt().then((status) => setIsArtSaved(status));
    // getSubmission();
    getOtherArtwork();
    getThumbnails();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
          Title:
          {submission.title}
        </Text>
        <Switch value={isArtSaved} onValueChange={onPressToggleSavedArt} title="Art Save Button" />
      </View>
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
                    <>
                      <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: mediaData.MediaURL }}
                      />
                      <Button title="Share" onPress={() => handleShare(mediaData.MediaURL)}>
                        <Text>Share</Text>
                      </Button>
                    </>
                  );
                }
                if (type === 'video') {
                  return (
                    <>
                      <VideoPlayer
                        videoProps={{
                          shouldPlay: false,
                          source: {
                            uri: mediaData.MediaURL,
                          },
                        }}
                      />
                      <Button title="Share" onPress={() => handleShare(mediaData.MediaURL)}>
                        <Text>Share</Text>
                      </Button>
                    </>
                  );
                }
                if (type === 'audio') {
                  return (
                    <>
                      <AudioPlayer
                        source={mediaData.MediaURL}
                      />
                      <Button title="Share" onPress={() => handleShare(mediaData.MediaURL)}>
                        <Text>Share</Text>
                      </Button>
                    </>
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
      <View>
        <Text style={styles.userArtTitle}>
          Other work from this user
        </Text>
        <ScrollView horizontal contentContainerStyle={styles.userArtContainer}>
          {loadSavedArt ? (
            savedArt.map((oneArt) => (
              <Card style={styles.savedArtCard}>
                <Card.Cover
                  style={{ height: 200, width: 200 }}
                  source={{ uri: findThumbnail(oneArt) }}
                />
              </Card>
            ))
          ) : <Text>There is no user art</Text>}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

ArtworkDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      artworkId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ArtworkDetailScreen;
