import React, { useEffect, useState } from 'react';
import {
  Dimensions, StyleSheet, View, Text, ScrollView, Image, Switch, TouchableOpacity,
} from 'react-native';
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
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  belowImage: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 40,
  },
  tags: {
    paddingTop: 20,
    flexDirection: 'row',
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
  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });

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
                      <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                          <Text style={{ fontFamily: 'MontserratMedium', fontSize: 24 }}>{submission.title}</Text>
                          <Text style={{ fontFamily: 'Montserrat', color: '#5B6772', paddingTop: 4 }}>Month DD, YYYY</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <Switch value={isArtSaved} onValueChange={onPressToggleSavedArt} title="Art Save Button" />
                        <TouchableOpacity onPress={() => handleShare(mediaData.MediaURL)}>
                          <Image source={require('../assets/artDetails/share.png')} style={{ width: 23, height: 23 }} />
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
                      <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                          <Text style={{ fontFamily: 'MontserratMedium', fontSize: 24 }}>{submission.title}</Text>
                          <Text style={{ fontFamily: 'Montserrat', color: '#5B6772', paddingTop: 4 }}>Month DD, YYYY</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <Switch value={isArtSaved} onValueChange={onPressToggleSavedArt} title="Art Save Button" />
                        <TouchableOpacity onPress={() => handleShare(mediaData.MediaURL)}>
                          <Image source={require('../assets/artDetails/share.png')} style={{ width: 23, height: 23 }} />
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
                      <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                          <Text style={{ fontFamily: 'MontserratMedium', fontSize: 24 }}>{submission.title}</Text>
                          <Text style={{ fontFamily: 'Montserrat', color: '#5B6772', paddingTop: 4 }}>Month DD, YYYY</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <Switch value={isArtSaved} onValueChange={onPressToggleSavedArt} title="Art Save Button" />
                        <TouchableOpacity onPress={() => handleShare(mediaData.MediaURL)}>
                          <Image source={require('../assets/artDetails/share.png')} style={{ width: 23, height: 23 }} />
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
          <View style={{
            borderColor: '#4C4C9B', borderRadius: 20, borderWidth: 0.6, alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 7, marginRight: 15,
          }}
          >
            <Text style={{
              fontFamily: 'MontserratMedium', fontSize: 14, textAlign: 'center', textAlignVertical: 'center', color: '#4C4C9B',
            }}
            >
              illustration
            </Text>
          </View>
          <View style={{
            borderColor: '#4C4C9B', borderRadius: 20, borderWidth: 0.6, alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 7,
          }}
          >
            <Text style={{
              fontFamily: 'MontserratMedium', fontSize: 14, textAlign: 'center', textAlignVertical: 'center', color: '#4C4C9B',
            }}
            >
              digital art
            </Text>
          </View>
        </View>
        <View style={{
          borderBottomColor: '#D4D4D4', borderBottomWidth: 1, marginTop: 30, marginBottom: 20
        }}
        />
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
