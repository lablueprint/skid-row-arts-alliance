// TODO: Improve carousel
import React, { useState, useRef } from 'react';
import {
  StyleSheet, TextInput, Text, View, ScrollView, Image,
  Modal, TouchableWithoutFeedback, PanResponder, Animated, Dimensions, TouchableOpacity, Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';

import Icon from 'react-native-vector-icons/Feather';

import PropTypes from 'prop-types';

import { URL } from '@env';

import { Video as ExpoVideo, ResizeMode } from 'expo-av';
import AudioPlayer from '../Components/AudioPlayer';

const audioIcon = require('../assets/audioIcon.png');
const cameraIcon = require('../assets/camera.png');
const cameraRollIcon = require('../assets/cameraRoll.png');
const fileSelectorIcon = require('../assets/fileSelector.png');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submissionsContainer: {
    padding: 5,
  },
  submission: {
    margin: 10,
  },
  selectedBtn: {
    backgroundColor: '#4c4c9b',
  },
  unselectedBtn: {
    backgroundColor: 'ffffff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContentContainer: {
    backgroundColor: 'white',
    width: '100%',
    heigth: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  tagBtn: {
    padding: '2.75%',
    paddingHorizontal: '7.5%',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
    marginTop: '2.5%',
    marginRight: '2.5%',
  },
});

function SubmissionScreen({ navigation }) {
  const [artworkTitle, setArtworkTitle] = useState('');
  const [description, setDescription] = useState('');
  const [page, setPage] = useState('upload');

  const descriptionRef = useRef();

  const [files, setFiles] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [tags, setTags] = useState([]);
  const [confirmedTags, setConfirmedTags] = useState([]);

  const [preview, setPreview] = useState('none');
  const [previewFile, setPreviewFile] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(-1);
  const [videoAR, setVideoAR] = useState(-1);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const [carouselIdx, setCarouselIdx] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(false);

  const tagOptions = {
    Image: ['traditional art', 'illustration', 'photography', 'graphic design', 'digital art'],
    Audio: ['music', 'poetry', 'speech'],
    Video: ['short film', 'performance', 'music video'],
  };

  const resetAspectRatios = () => {
    setAspectRatio(-1);
    setVideoAR(-1);
    setVideoLoaded(false);
    setControlsVisible(true);
  };

  const closePreview = () => {
    setPreview('none');
    setPreviewFile(null);
    resetAspectRatios();
  };

  const openPreview = (file, type) => {
    setPreviewFile(file);
    setPreview(type);
  };

  const alertLimit = () => {
    Alert.alert(
      'Maximum upload size',
      'You may only upload up to 5 files per submission!',
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  };

  const [popup, setPopup] = useState(false);
  const closePopup = () => {
    setPopup(false);
  };
  const openPopup = () => {
    if (files.length >= 5) {
      alertLimit();
      return;
    }
    setPopup(true);
  };
  const windowHeight = Dimensions.get('window').height;
  const popupHeight = 300; // Height of the popup content
  const panY = useRef(new Animated.Value(windowHeight)).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dy }) => {
      // Prevent dragging beyond top and bottom limits
      if (dy >= 0 && dy <= windowHeight - popupHeight) {
        panY.setValue(dy);
      }
    },
    onPanResponderRelease: (_, { dy }) => {
      if (dy >= 200) {
        closePopup();
      } else {
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });
  panY.setValue(0);

  const reset = () => {
    setArtworkTitle('');
    setDescription('');
    setFiles([]);
    setThumbnails([]);
    setTags([]);
    setConfirmedTags([]);
    closePreview();
    closePopup();
    setCarouselIdx(0);
    setPage('upload');
  };

  const getType = (uri, fileType) => {
    const splitted = uri.split('.');
    const uriType = splitted[splitted.length - 1];
    if (uriType === 'mov') {
      return `${fileType}/quicktime`;
    }
    if (uriType.includes('m4a')) {
      return 'audio/x-m4a';
    }
    return `${fileType}/${uriType}`;
  };

  const readFileToBlob = async (file, reader) => {
    try {
      const res = await fetch(file);
      const blob = await res.blob();
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error(err);
    }
  };

  const submit = async () => {
    if (files.length < 1) {
      Alert.alert(
        'Please upload a file',
        'You need to upload at least one file to submit!',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
      return;
    }

    if (artworkTitle === '') {
      Alert.alert(
        'Empty title',
        'Please include a title!',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
      return;
    }

    if (description === '') {
      Alert.alert(
        'Empty description',
        'Please include a description!',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
      return;
    }

    let thumbnailExists = true;
    const filesToSubmit = [];
    files.forEach((f) => filesToSubmit.push(f));
    if (thumbnails[0] !== 'default') {
      filesToSubmit.push({ uri: thumbnails[0], type: 'image/jpg' });
    } else {
      thumbnailExists = false;
    }

    const fileArray = filesToSubmit.map((file) => {
      const fReader = new FileReader();
      return new Promise((resolve) => {
        fReader.addEventListener('loadend', async () => {
          resolve(fReader.result.replace(/^.*base64,/, ''));
        });
        readFileToBlob(file.uri, fReader);
      });
    });

    const streams = await Promise.all(fileArray).catch((err) => console.error(err));
    const objects = [];
    for (let i = 0; i < streams.length; i += 1) {
      objects.push({ uri: streams[i], type: filesToSubmit[i].type });
    }

    try {
      const res = await axios.post(`${URL}/submissions/post`, {
        name: 'Ryan',
        email: 'ryanswkim2003@gmail.com',
        socials: {
          platform: 'Instagram',
          tag: '@rkim',
        },
        title: artworkTitle,
        description,
        objects,
        thumbnailExists,
        tags: confirmedTags,
      });
      reset();
      Alert.alert(
        'Submission successful',
        'Please allow up to 10 business days for the gallery to update!',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const addFile = async (fileURI, fileType, fileName) => {
    if (files.length >= 5) {
      alertLimit();
      return;
    }
    if (files.length >= 4) {
      setPopup(false);
    }
    if (fileType.includes('image')) {
      setFiles((prev) => ([...prev, { uri: fileURI, type: Array.from(new Set(fileType.split('/'))).join('/') }]));
      setThumbnails((prev) => ([...prev, fileURI]));
    } else if (fileType.includes('video')) {
      setFiles((prev) => ([...prev, { uri: fileURI, type: Array.from(new Set(fileType.split('/'))).join('/') }]));
      try {
        const res = await VideoThumbnails.getThumbnailAsync(fileURI);
        setThumbnails((prev) => ([...prev, res.uri]));
      } catch (err) {
        console.error(err);
      }
    } else if (fileType.includes('audio')) {
      setFiles((prev) => ([...prev, { uri: fileURI, type: Array.from(new Set(fileType.split('/').filter((type) => type !== 'mp4'))).join('/'), label: fileName }]));
      setThumbnails((prev) => ([...prev, 'default']));
    } else {
      Alert.alert(
        'Invalid file type',
        'We only accept images, videos, and audios!',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    }
  };

  const removeFile = (uri) => {
    const idx = thumbnails.indexOf(uri);
    setThumbnails(thumbnails.filter((_, i) => i !== idx));
    setFiles(files.filter((_, i) => i !== idx));
  };

  const removeAudioFile = (uri) => {
    for (let i = 0; i < files.length; i += 1) {
      if (files[i].uri === uri) {
        setFiles(files.filter((_, j) => i !== j));
        setThumbnails(thumbnails.filter((_, j) => i !== j));
        return;
      }
    }
    console.error('File to be removed not found!');
  };

  const openCameraRoll = async () => {
    if (files.length >= 5) {
      alertLimit();
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, type } = result.assets[0];
      addFile(uri, getType(uri, type));
    }
  };

  const openCamera = async () => {
    if (files.length >= 5) {
      alertLimit();
      return;
    }
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, type } = result.assets[0];
      addFile(uri, getType(uri, type));
    }
  };

  const openFileSelector = async () => {
    if (files.length >= 5) {
      alertLimit();
      return;
    }
    const result = await DocumentPicker.getDocumentAsync({
      multiple: true,
      copyToCacheDirectory: true,
    });

    if (result.type === 'success') {
      addFile(result.uri, getType(result.uri, result.mimeType), result.name);
    }
  };

  if (page === 'upload') {
    const images = [];
    const videos = [];
    const audios = [];
    files.forEach((f, i) => {
      if (f.type.includes('image')) {
        images.push(thumbnails[i]);
      } else if (f.type.includes('video')) {
        videos.push(thumbnails[i]);
      } else {
        audios.push(f);
      }
    });

    let previewDisplay = '';
    if (previewFile !== null) {
      if (preview === 'image') {
        if (aspectRatio === -1) {
          Image.getSize(previewFile, (width, height) => {
            setAspectRatio(width / height);
          });
        }
        previewDisplay = (
          <TouchableWithoutFeedback onPress={closePreview}>
            <View style={{
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
            >
              <Image
                source={{ uri: previewFile }}
                style={{
                  width: '80%',
                  maxHeight: '80%',
                  aspectRatio,
                  borderRadius: 30,
                  backgroundColor: 'white',
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        );
      } else if (preview === 'video') {
        previewDisplay = (
          <TouchableWithoutFeedback>
            <View style={{
              width: '80%',
              maxHeight: '80%',
              zIndex: 100,
              aspectRatio: parseFloat(`${videoAR === -1 ? 1 : videoAR}`),
            }}
            >
              <ExpoVideo
                onReadyForDisplay={(e) => {
                  setVideoAR(e.naturalSize.width / e.naturalSize.height);
                }}
                source={{ uri: files[thumbnails.indexOf(previewFile)].uri }}
                style={{
                  height: '100%', width: '100%', borderRadius: 10, opacity: videoAR !== -1 ? 1 : 0,
                }}
                onLoad={() => { setVideoLoaded(true); }}
                useNativeControls={videoLoaded}
                resizeMode={ResizeMode.CONTAIN}
                isLooping
              />
            </View>
          </TouchableWithoutFeedback>
        );
      } else {
        previewDisplay = (
          <View style={{
            backgroundColor: 'white',
            zIndex: 3,
            width: '80%',
            maxHeight: '80%',
            aspectRatio: 2,
            padding: '5%',
            paddingTop: '7.5%',
            borderRadius: 10,
          }}
          >
            <AudioPlayer source={previewFile} />
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ width: '100%' }}>
          <View style={{
            paddingTop: '9%',
            paddingBottom: '20%',
            paddingHorizontal: '4%',
            flex: 1,
          }}
          >
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              marginTop: '1%',
            }}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  backgroundColor: '#fff',
                  zIndex: 100,
                  left: '1%',
                }}
                onPress={() => { navigation.navigate('Gallery'); }}
              >
                <Icon name="chevron-left" size={30} color="black" />
              </TouchableOpacity>
              <Text style={{
                flexGrow: 1,
                flexShrink: 1,
                textAlign: 'center',
                fontSize: 22,
              }}
              >
                Content Uploaded
              </Text>
            </View>

            <Text style={{
              marginTop: '4%',
              fontSize: 16,
              fontWeight: '300',
              color: '#444',
            }}
            >
              Review files
              to upload for submission.
            </Text>

            <TouchableOpacity
              onPress={openPopup}
              style={{
                marginTop: '5%',
                padding: '1.5%',
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#4c4c9b',
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <Text style={{
                color: '#4c4c9b',
                fontSize: 18,
                fontWeight: '600',
                paddingVertical: '1.5%',
              }}
              >
                +   Add Content
              </Text>
            </TouchableOpacity>

            {images.length > 0 ? (
              <View>
                <Text style={{
                  paddingBottom: '1.5%',
                  marginTop: '5%',
                  marginBottom: '1%',
                  fontSize: 18,
                  fontWeight: '500',
                  borderBottomWidth: 1,
                  borderColor: '#999',
                }}
                >
                  Images
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}
                >
                  {images.map((uri) => (
                    <View
                      style={{
                        width: '48%',
                        marginTop: '4%',
                      }}
                      key={uri}
                    >
                      <ThumbnailDisplay
                        uri={uri}
                        remove={removeFile}
                        preview={() => { openPreview(uri, 'image'); }}
                      />
                    </View>
                  ))}
                </View>
              </View>
            ) : ''}

            {videos.length > 0 ? (
              <View>
                <Text style={{
                  paddingBottom: '1.5%',
                  marginTop: '5%',
                  marginBottom: '1%',
                  fontSize: 18,
                  fontWeight: '500',
                  borderBottomWidth: 1,
                  borderColor: '#999',
                }}
                >
                  Videos
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}
                >
                  {videos.map((uri) => (
                    <View
                      style={{
                        width: '48%',
                        marginTop: '4%',
                      }}
                      key={uri}
                    >
                      <ThumbnailDisplay
                        uri={uri}
                        remove={removeFile}
                        preview={() => { openPreview(uri, 'video'); }}
                      />
                    </View>
                  ))}
                </View>
              </View>
            ) : ''}

            {audios.length > 0 ? (
              <View>
                <Text style={{
                  paddingBottom: '1.5%',
                  marginTop: '5%',
                  marginBottom: '1%',
                  fontSize: 18,
                  fontWeight: '500',
                  borderBottomWidth: 1,
                  borderColor: '#999',
                }}
                >
                  Audio
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginTop: '1%',
                  }}
                >
                  {audios.map((file, i) => (
                    /* eslint-disable react/no-array-index-key */
                    <TouchableOpacity
                      onPress={() => { openPreview(file.uri, 'audio'); }}
                      activeOpacity={0.6}
                      key={`${file}${i}`}
                    >
                      <View
                        style={{
                          width: '100%',
                          backgroundColor: '#ccc',
                          paddingHorizontal: '3%',
                          paddingVertical: '2.5%',
                          marginTop: '3%',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderRadius: 10,
                        }}
                      >
                        <Image
                          source={audioIcon}
                          style={{
                            width: '9%',
                            aspectRatio: 1,
                          }}
                        />
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 18,
                            fontWeight:
                            '500',
                            marginLeft: '6%',
                            maxWidth: '65%',
                          }}
                        >
                          {file.label}
                        </Text>
                        <TouchableWithoutFeedback onPress={() => { removeAudioFile(file.uri); }}>
                          <View style={{
                            position: 'absolute',
                            right: '4%',
                          }}
                          >
                            <Icon name="x" size={28} color="black" />
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </TouchableOpacity>

                  ))}
                </View>
              </View>
            ) : ''}

            <View style={{
              width: '99%',
              height: '13.5%',
            }}
            />
          </View>

          <Modal
            transparent
            visible={preview !== 'none' && previewFile !== null}
            onRequestClose={closePreview}
          >
            <TouchableWithoutFeedback onPress={closePreview}>
              <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                width: '100%',
                height: '100%',
                zIndex: 2,
              }}
              />
            </TouchableWithoutFeedback>
            {(videoAR === -1 && preview === 'video')
            || (aspectRatio !== -1 && preview === 'image')
              ? (
                <View style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                }}
                >
                  <ActivityIndicator
                    size="large"
                    color="#4c4c9b"
                  />
                </View>
              ) : ''}
            <View style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
            }}
            >
              {previewDisplay}
            </View>
          </Modal>
          <Modal
            transparent
            visible={popup}
            onRequestClose={closePopup}
          >
            <TouchableWithoutFeedback style={{ zIndex: 1000 }}>
              <View style={styles.modalContainer} />
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            animationType="slide"
            transparent
            visible={popup}
            onRequestClose={closePopup}
          >
            <TouchableWithoutFeedback onPress={closePopup}>
              <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              >
                <Animated.View
                  style={[
                    styles.modalContentContainer,
                    {
                      transform: [{ translateY: panY }],

                    },
                  ]}
                  {...panResponder.panHandlers}
                >
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      zIndex: 100,
                      right: '4.5%',
                      top: '7%',
                    }}
                    onPress={closePopup}
                  >
                    <Icon name="x" size={28} color="black" />
                  </TouchableOpacity>
                  <View style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', top: '7%',
                  }}
                  >
                    <Text style={{ fontSize: 24 }}>Art Submission</Text>
                  </View>
                  <View style={{
                    width: '75%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '13.5%',
                  }}
                  >
                    <Text style={{
                      fontSize: 16.5, fontWeight: '300', width: '100%',
                    }}
                    >
                      Attach content to your
                      submission by tapping an option below!
                    </Text>
                  </View>

                  <View style={{
                    width: '75%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  >
                    <Text style={{
                      fontSize: 16.5, fontWeight: '300', marginTop: '5%', width: '100%', fontStyle: 'italic', color: '#444',
                    }}
                    >
                      *Acceptable content types include png, jpg, jpeg, mp3, m4a, mp4, mov
                    </Text>
                  </View>

                  <View style={{
                    marginTop: '10%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: '10%',
                    paddingVertical: '5%',
                    borderTopColor: '#4C4C9B',
                    borderTopWidth: 0.5,
                    width: '100%',
                  }}
                  >
                    <View style={{
                      width: '30%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    >
                      <TouchableOpacity
                        onPress={openCamera}
                        style={{
                          backgroundColor: '#D0D0E8',
                          padding: '8.5%',
                          borderRadius: 1000,
                          width: '55%',
                          aspectRatio: 1,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Image
                          source={cameraIcon}
                          style={{
                            width: '80%',
                            height: '80%',
                            aspectRatio: 1,
                          }}
                        />
                      </TouchableOpacity>
                      <Text style={{
                        color: '#424288',
                        marginTop: '5%',
                        fontSize: 17,
                        fontWeight: '500',
                        textAlign: 'center',
                      }}
                      >
                        {'Take Photo'.replace(/ /g, '\n')}
                      </Text>
                    </View>

                    <View style={{
                      width: '30%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    >
                      <TouchableOpacity
                        onPress={openCameraRoll}
                        style={{
                          backgroundColor: '#D0D0E8',
                          padding: '8.5%',
                          borderRadius: 1000,
                          width: '55%',
                          aspectRatio: 1,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Image
                          source={cameraRollIcon}
                          style={{
                            width: '80%',
                            height: '80%',
                            aspectRatio: 1,
                          }}
                        />
                      </TouchableOpacity>
                      <Text style={{
                        color: '#424288',
                        marginTop: '5%',
                        fontSize: 17,
                        fontWeight: '500',
                        textAlign: 'center',
                      }}
                      >
                        {'Camera Roll'.replace(/ /g, '\n')}
                      </Text>
                    </View>

                    <View style={{
                      width: '30%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    >
                      <TouchableOpacity
                        onPress={openFileSelector}
                        style={{
                          backgroundColor: '#D0D0E8',
                          padding: '8.5%',
                          borderRadius: 1000,
                          width: '55%',
                          aspectRatio: 1,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Image
                          source={fileSelectorIcon}
                          style={{
                            width: '80%',
                            height: '80%',
                            aspectRatio: 1,
                          }}
                        />
                      </TouchableOpacity>
                      <Text style={{
                        color: '#424288',
                        marginTop: '5%',
                        fontSize: 17,
                        fontWeight: '500',
                        textAlign: 'center',
                      }}
                      >
                        {'Attach File'.replace(/ /g, '\n')}
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '99%',
          padding: '4%',
          paddingRight: '3%',
          paddingBottom: '5%',
          backgroundColor: 'white',
        }}
        >
          <TouchableOpacity
            style={{
              width: '100%',
              backgroundColor: '#4c4c9b',
              borderColor: '#4c4c9b',
              borderWidth: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2.5%',
              borderRadius: 5,
            }}
            onPress={() => {
              if (files.length === 0) {
                Alert.alert(
                  'Please upload a file',
                  'You need to upload at least one file to continue!',
                  [
                    { text: 'OK' },
                  ],
                  { cancelable: false },
                );
                return;
              }
              closePreview();
              closePopup();
              setPage('fields');
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 17,
              fontWeight: '500',
            }}
            >
              Next

            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } if (page === 'fields') {
    let carouselDisplay = '';
    if (files[carouselIdx].type.includes('image')) {
      if (aspectRatio === -1) {
        Image.getSize(files[carouselIdx].uri, (width, height) => {
          setAspectRatio(width / height);
        });
      }
      carouselDisplay = (
        <View style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
        }}
        >
          <Image
            source={{ uri: files[carouselIdx].uri }}
            style={{
              height: '100%',
              aspectRatio,
              maxWidth: '100%',
              borderRadius: 12,
            }}
          />
        </View>
      );
    } else if (files[carouselIdx].type.includes('video')) {
      carouselDisplay = (
        <TouchableWithoutFeedback onPress={() => { setControlsVisible(!controlsVisible); }}>
          <View style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
          }}
          >
            <ExpoVideo
              onReadyForDisplay={(e) => {
                setVideoAR(e.naturalSize.width / e.naturalSize.height);
              }}
              source={{ uri: files[carouselIdx].uri }}
              style={{
                height: '100%', width: '100%', borderRadius: 10, opacity: 1,
              }}
              onLoad={() => { setVideoLoaded(true); }}
              useNativeControls={videoLoaded && controlsVisible}
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      carouselDisplay = (
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '10%',
            paddingTop: '14%',
            paddingHorizontal: '20%',
            borderRadius: 12,
          }}
        >
          <AudioPlayer source={files[carouselIdx].uri} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ width: '100%' }}
        >
          <View style={{
            paddingTop: '9%',
            paddingBottom: '19%',
            paddingHorizontal: '4%',
            flex: 1,
          }}
          >
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              marginTop: '1%',
            }}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  backgroundColor: '#fff',
                  zIndex: 100,
                  left: '1%',
                }}
                onPress={() => {
                  closePopup();
                  closePreview();
                  setPage('upload');
                }}
              >
                <Icon name="chevron-left" size={30} color="black" />
              </TouchableOpacity>
              <Text style={{
                flexGrow: 1, flexShrink: 1, textAlign: 'center', fontSize: 22,
              }}
              >
                Submit your art!
              </Text>
            </View>

            <View style={{
              width: '100%',
              height: 200,
              alignSelf: 'center',
              marginTop: '10%',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#ddd',
              justifyContent: 'center',
            }}
            >
              {(videoAR === -1 && files[carouselIdx].type.includes('video')) || (aspectRatio === -1 && files[carouselIdx].type.includes('image'))
                ? (
                  <View style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                  }}
                  >
                    <ActivityIndicator
                      size="large"
                      color="#4c4c9b"
                    />
                  </View>
                ) : ''}
              <View
                style={{
                  backgroundColor: files[carouselIdx].type.includes('audio') ? '#f2f2f2' : 'rgba(0, 0, 0, 0)',
                  width: '100%',
                  justifyContent: 'center',
                  borderRadius: 12,
                  height: '100%',
                }}
              >
                {carouselDisplay}
                {files.length > 1
                  ? (
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        zIndex: 100,
                        right: '2.5%',
                        backgroundColor: '#4C4C9B',
                        padding: '1.5%',
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setCarouselIdx((carouselIdx + 1
                  + thumbnails.length) % thumbnails.length);
                        resetAspectRatios();
                      }}
                    >
                      <Icon name="chevron-right" size={30} color="white" />
                    </TouchableOpacity>
                  )
                  : ''}

                {files.length > 1
                  ? (
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        zIndex: 100,
                        left: '2.5%',
                        backgroundColor: '#4C4C9B',
                        padding: '1.5%',
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setCarouselIdx((carouselIdx - 1
                   + thumbnails.length) % thumbnails.length);
                        resetAspectRatios();
                      }}
                    >
                      <Icon name="chevron-left" size={30} color="white" />
                    </TouchableOpacity>
                  ) : ''}
              </View>

            </View>

            <View style={{
              width: '100%',
              marginTop: '7.5%',
            }}
            >
              <Text style={{
                fontSize: 18,
                fontWeight: '500',
              }}
              >
                Title

              </Text>
              <TextInput
                maxLength={100}
                style={{
                  backgroundColor: '#f2f2f2',
                  borderRadius: 10,
                  borderColor: '#ddd',
                  borderWidth: 1,
                  marginTop: '3%',
                  padding: '2%',
                  paddingHorizontal: '5%',
                  fontSize: 16,
                  color: '#888',
                }}
                value={artworkTitle}
                onChangeText={(e) => { setArtworkTitle(e); }}
                onSubmitEditing={() => { descriptionRef.current.focus(); }}
              />
            </View>

            <View style={{
              width: '100%',
              marginTop: '7.5%',
            }}
            >
              <Text style={{
                fontSize: 18,
                fontWeight: '500',
              }}
              >
                Description
              </Text>
              <TextInput
                ref={descriptionRef}
                style={{
                  textAlignVertical: 'top',
                  backgroundColor: '#f2f2f2',
                  height: 175,
                  marginTop: '3%',
                  paddingTop: '4%',
                  paddingHorizontal: '5%',
                  paddingBottom: '7.5%',
                  borderRadius: 10,
                  borderColor: '#ddd',
                  borderWidth: 1,
                  fontSize: 16,
                  color: '#888',
                }}
                multiline
                maxLength={300}
                value={description}
                onChangeText={(e) => { setDescription(e); }}
              />
              <Text style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#999',
                position: 'absolute',
                bottom: '3%',
                right: '3%',
              }}
              >
                {`${description.length}/300`}
              </Text>
            </View>

            <View style={{
              width: '100%',
              marginTop: '7.5%',
            }}
            >
              <Text style={{
                fontSize: 18,
                fontWeight: '500',
              }}
              >
                Tags
              </Text>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                marginTop: '2%',
              }}
              >
                {tags.map((tag) => (
                  <View
                    key={tag}
                    activeOpacity={1}
                    style={{
                      paddingVertical: '2%',
                      paddingRight: '2.25%',
                      paddingLeft: '4%',
                      borderRadius: 50,
                      marginTop: '2.5%',
                      marginRight: '2.5%',
                      backgroundColor: '#4c4c9b',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>{tag}</Text>
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#DBDBEB',
                        padding: '2%',
                        borderRadius: 100,
                        marginLeft: '1%',
                      }}
                    >
                      <TouchableWithoutFeedback onPress={() => {
                        setTags(tags.filter((t) => t !== tag));
                      }}
                      >
                        <Icon name="x" size={20} color="#4c4c9b" />
                      </TouchableWithoutFeedback>
                    </View>

                  </View>
                ))}
              </View>
              <TouchableOpacity
                onPress={() => {
                  closePopup();
                  closePreview();
                  setPage('tags');
                }}
                style={{
                  marginTop: '3.5%',
                  padding: '1.5%',
                  width: '40%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#4c4c9b',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
              >
                <Text style={{
                  color: '#4c4c9b',
                  fontSize: 18,
                  fontWeight: '600',
                }}
                >
                  +   Add Tags
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{
              width: '99%',
              paddingBottom: '1.75%',
            }}
            />

          </View>

        </ScrollView>
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '99%',
          padding: '4%',
          paddingRight: '3%',
          paddingBottom: '5%',
          backgroundColor: 'white',
        }}
        >
          <TouchableOpacity
            style={{
              width: '100%',
              backgroundColor: '#4c4c9b',
              borderColor: '#4c4c9b',
              borderWidth: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2.5%',
              borderRadius: 5,
            }}
            onPress={() => {
              if (files.length === 0) return;
              submit();
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 17,
              fontWeight: '500',
            }}
            >
              Submit

            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } if (page === 'tags') {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ width: '100%' }}>
          <View style={{
            paddingTop: '9%',
            paddingBottom: '19%',
            paddingHorizontal: '4%',
            flex: 1,
          }}
          >
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: '4%',
              marginTop: '1%',
            }}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  backgroundColor: '#fff',
                  zIndex: 100,
                  left: '1%',
                }}
                onPress={() => {
                  closePopup();
                  closePreview();
                  setTags(confirmedTags);
                  setPage('fields');
                }}
              >
                <Icon name="chevron-left" size={30} color="black" />
              </TouchableOpacity>
              <Text style={{
                flexGrow: 1,
                flexShrink: 1,
                textAlign: 'center',
                fontSize: 22,
              }}
              >
                Add Tags
              </Text>
            </View>

            {Object.keys(tagOptions).map((category) => (
              <View
                key={category}
                style={{
                  width: '100%',
                  marginTop: '7.5%',
                  paddingHorizontal: '1%',
                }}
              >
                <Text style={{
                  fontSize: 22,
                  fontWeight: '400',
                  marginBottom: '3%',
                }}
                >
                  {category}

                </Text>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  width: '100%',
                }}
                >
                  {tagOptions[category].map((option) => (
                    <TouchableOpacity
                      key={option}
                      activeOpacity={1}
                      style={[styles.tagBtn, tags.includes(option) ? { backgroundColor: '#4c4c9b', borderColor: '#4c4c9b' } : { backgroundColor: '#fff' }]}
                      onPress={() => {
                        if (tags.includes(option)) {
                          setTags(tags.filter((tag) => tag !== option));
                        } else {
                          setTags((prev) => ([...prev, option]));
                        }
                      }}
                    >
                      <Text style={[{ fontSize: 17 }, tags.includes(option) ? { color: 'white' } : { color: 'black' }]}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}

          </View>
          <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '4.5%',
            paddingBottom: '5%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          >
            <TouchableOpacity
              style={{
                width: '48%',
                backgroundColor: 'white',
                borderColor: '#4c4c9b',
                borderWidth: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2.5%',
                borderRadius: 5,
              }}
              onPress={() => {
                setTags([]);
              }}
            >
              <Text style={{
                color: '#4c4c9b',
                fontSize: 17,
                fontWeight: '600',
              }}
              >
                Clear All

              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '48%',
                backgroundColor: '#4c4c9b',
                borderColor: '#4c4c9b',
                borderWidth: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2.5%',
                borderRadius: 5,
              }}
              onPress={() => {
                closePopup();
                closePreview();
                setConfirmedTags(tags);
                setPage('fields');
              }}
            >
              <Text style={{
                color: 'white',
                fontSize: 17,
                fontWeight: '600',
              }}
              >
                Apply

              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>

    );
  }
  return '';
}

function ThumbnailDisplay({ uri, remove, preview }) {
  return (
    <TouchableOpacity
      onPress={() => { preview(uri); }}
      activeOpacity={0.6}
    >
      <View
        key={uri}
        style={{
          width: '100%',
          aspectRatio: 1.4,
          borderWidth: 1,
          borderColor: '#53595C',
          borderRadius: 10,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => { remove(uri); }}
        >
          <View style={{
            position: 'absolute',
            zIndex: 100,
            left: '92%',
            bottom: '88%',
            backgroundColor: 'black',
            aspectRatio: 1,
            borderRadius: 100,
            padding: '1%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <Icon name="x" size={22} color="white" />
          </View>
        </TouchableWithoutFeedback>

        <Image
          source={{ uri }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 8,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

SubmissionScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

ThumbnailDisplay.propTypes = {
  uri: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  preview: PropTypes.func.isRequired,
};

export default SubmissionScreen;
