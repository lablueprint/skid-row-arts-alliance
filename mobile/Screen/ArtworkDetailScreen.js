import React, { useEffect, useState } from 'react';
import {
  Dimensions, StyleSheet, View, Text, ScrollView, Image, Switch, TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import VideoPlayer from 'expo-video-player';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AudioPlayer from '../Components/AudioPlayer';

const screenWidth = Dimensions.get('window').width;
const MAX_LINES = 3; // max number of lines to show in artwork description by default

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
  },
  aboveImage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  belowImage: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 40,
  },
  tags: {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    borderColor: '#4C4C9B',
    borderRadius: 20,
    borderWidth: 0.6,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 7,
    marginRight: 15,
    marginBottom: 10,
  },
  tagText: {
    fontFamily: 'MontserratMedium',
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#4C4C9B',
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  mediaContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mediaTitle: {
    fontFamily: 'MontserratMedium',
    fontSize: 24,
  },
  mediaDate: {
    fontFamily: 'Montserrat',
    color: '#5B6772',
    paddingTop: 4,
  },
  saveIcon: {
    width: 24,
    height: 24,
  },
  shareIcon: {
    width: 23,
    height: 23,
    marginLeft: 10,
  },
  line: {
    borderBottomColor: '#D4D4D4',
    borderBottomWidth: 1,
    marginTop: 20,
    marginBottom: 20,
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
  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });
  const { id, authHeader } = useSelector((state) => state.auth);

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

  const saveIcon = isArtSaved ? require('../assets/artDetails/saved.png') : require('../assets/artDetails/unsaved.png');

  const formattedDate = new Date(submission.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    getSavedArt().then((status) => setIsArtSaved(status));
    getSubmission();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.aboveImage}>
        <Image
          source={require('../assets/artDetails/defaultAvatar.png')}
          style={{ width: 18, height: 18 }}
        />
        <Text style={{ fontFamily: 'Montserrat', fontSize: 16, paddingLeft: 8 }}>
          {submission.name}
        </Text>
      </View>
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
                        style={{ width: screenWidth, height: screenWidth }}
                        source={{ uri: mediaData.MediaURL }}
                      />
                      <View style={styles.mediaContainer}>
                        <View>
                          <Text style={styles.mediaTitle}>{submission.title}</Text>
                          <Text style={styles.mediaDate}>{formattedDate}</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity onPress={onPressToggleSavedArt}>
                          <Image source={saveIcon} style={styles.saveIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleShare(mediaData.MediaURL)}>
                          <Image source={require('../assets/artDetails/share.png')} style={styles.shareIcon} />
                        </TouchableOpacity>
                      </View>
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
                      <View style={styles.mediaContainer}>
                        <View>
                          <Text style={styles.mediaTitle}>{submission.title}</Text>
                          <Text style={styles.mediaDate}>{formattedDate}</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity onPress={onPressToggleSavedArt}>
                          <Image source={saveIcon} style={styles.saveIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleShare(mediaData.MediaURL)}>
                          <Image source={require('../assets/artDetails/share.png')} style={styles.shareIcon} />
                        </TouchableOpacity>
                      </View>
                    </>
                  );
                }
                if (type === 'audio') {
                  return (
                    <>
                      <AudioPlayer
                        source={mediaData.MediaURL}
                      />
                      <View style={styles.mediaContainer}>
                        <View>
                          <Text style={styles.mediaTitle}>{submission.title}</Text>
                          <Text style={styles.mediaDate}>{formattedDate}</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity onPress={onPressToggleSavedArt}>
                          <Image source={saveIcon} style={styles.saveIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleShare(mediaData.MediaURL)}>
                          <Image source={require('../assets/artDetails/share.png')} style={styles.shareIcon} />
                        </TouchableOpacity>
                      </View>
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
      <View style={styles.belowImage}>
        <Text style={{ fontFamily: 'Montserrat', paddingTop: 6 }} numberOfLines={showFullDescription ? undefined : MAX_LINES} ellipsizeMode="tail">{submission.description}</Text>
        {submission.description?.length > MAX_LINES && (
          <TouchableOpacity onPress={toggleShowFullDescription}>
            <Text style={{ fontFamily: 'MontserratSemiBold', paddingTop: 10 }}>
              {showFullDescription ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.tags}>
          {submission.tags?.map((tag) => (
            <View
              key={tag}
              style={styles.tag}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.line} />
        <Text style={{ fontFamily: 'MontserratMedium', fontSize: 18, marginBottom: 20 }}>
          Other work from
          {' '}
          {submission.name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Image source={require('../assets/artDetails/temp1.png')} style={{ width: screenWidth * 0.45, height: screenWidth * 0.35, borderRadius: 10, marginRight: 6 }} />
          <Image source={require('../assets/artDetails/temp2.png')} style={{ width: screenWidth * 0.45, height: screenWidth * 0.35, borderRadius: 10, marginRight: 6 }} />
          <Image source={require('../assets/artDetails/temp3.png')} style={{ width: screenWidth * 0.45, height: screenWidth * 0.35, borderRadius: 10 }} />
        </View>
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
