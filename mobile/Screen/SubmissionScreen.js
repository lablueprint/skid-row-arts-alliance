import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, TextInput, Text, View, ScrollView, Button, Image,
  Modal, TouchableWithoutFeedback, PanResponder, Animated, Dimensions, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';

import { URL } from '@env';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
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
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContentContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
  selectedTagBtn: {
    backgroundColor: '#4c4c9b',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4c4c9b',
    alignSelf: 'center',
  },
  unselectedTagBtn: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
  },
});

function SubmissionScreen() {
  const [submissions, setSubmissions] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState('');
  const [accountTag, setAccountTag] = useState('');
  const [artworkTitle, setArtworkTitle] = useState('');
  const [description, setDescription] = useState('');
  const [page, setPage] = useState('upload');

  const nameRef = useRef();
  const emailRef = useRef();
  const platformRef = useRef();
  const accountRef = useRef();
  const artworkRef = useRef();
  const descriptionRef = useRef();

  const [files, setFiles] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [tags, setTags] = useState([]);
  const [confirmedTags, setConfirmedTags] = useState([]);

  const tagOptions = {
    audio: ['music', 'poetry', 'storytelling'],
    image: ['photography', 'illustration', 'digital art', 'graphic design', 'traditional art'],
    video: ['short film', 'performance', 'music video'],
  };

  const [popup, setPopup] = useState(false);
  const closePopup = () => {
    setPopup(false);
  };
  const openPopup = () => {
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
      if (dy >= 160) {
        // Close modal if dragged down by at least 100 units
        closePopup();
      } else {
        // Reset modal position if not dragged down enough
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });
  panY.setValue(0);

  const clearInput = () => {
    setName('');
    setEmail('');
    setPlatform('');
    setAccountTag('');
    setArtworkTitle('');
    setDescription('');
    setFiles([]);
    setThumbnails([]);
  };

  const getType = (uri, fileType) => {
    const splitted = uri.split('.');
    const uriType = splitted[splitted.length - 1];
    if (uriType === 'mov') {
      return `${fileType}/quicktime`;
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
    let thumbnailExists = true;
    const filesToSubmit = [];
    files.forEach((f) => filesToSubmit.push(f));
    if (thumbnails.length > 0) {
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
        name,
        email,
        socials: {
          platform,
          tag: accountTag,
        },
        title: artworkTitle,
        description,
        objects,
        thumbnailExists,
        tags: confirmedTags,
      });
      setSubmissions((prev) => ([...prev, res.data]));
      clearInput();
    } catch (err) {
      console.error(err);
    }
  };

  const addFile = async (fileURI, fileType) => {
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
    } else { // Implement default thumbnail in future if we have additional file types (e.g. audio)
      console.log('Default');
      setFiles((prev) => ([...prev, { uri: fileURI, type: Array.from(new Set(fileType.split('/').filter((type) => type !== 'mp4'))).join('/') }]));
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, type } = result.assets[0];
      addFile(uri, getType(uri, type));
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, type } = result.assets[0];
      addFile(uri, getType(uri, type));
    }
  };

  const openFileSelector = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: true,
      copyToCacheDirectory: true,
    });

    if (result.type === 'success') {
      addFile(result.uri, getType(result.uri, result.mimeType));
    }
  };

  const getSubmissions = async () => {
    const result = await axios.get(`${URL}/submissions/get`);
    setSubmissions(result.data);
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  if (page === 'upload') {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Button title="<" onPress={() => { console.log('Back'); }} />
            <Button title="Upload" onPress={openPopup} />
            <Button title="Clear Selections" onPress={clearInput} />
            <Button title="Next" onPress={() => { setPage('fields'); }} />

            {thumbnails.map((uri) => (
              <Image
                source={{ uri }}
                key={uri}
                style={{ width: 200, height: 200 }}
              />
            ))}
          </View>
          <Modal
            animationType="slide"
            transparent
            visible={popup}
            onRequestClose={closePopup}
          >
            <TouchableWithoutFeedback onPress={closePopup}>
              <View style={styles.modalContainer}>
                <Animated.View
                  style={[
                    styles.modalContentContainer,
                    {
                      transform: [{ translateY: panY }],
                    },
                  ]}
                  {...panResponder.panHandlers}
                >
                  <Text style={styles.modalTitle}>Art Submission</Text>
                  <Text style={styles.modalText}>
                    Attach content to your
                    submission by tapping an option below!
                  </Text>
                  <Text style={styles.modalText}>
                    * Acceptable content types
                    include mp3, jpg, etc blah blah
                  </Text>
                  <Button title="Camera Roll" onPress={pickImage} />
                  <Button title="Use Camera" onPress={openCamera} />
                  <Button title="File Selector" onPress={openFileSelector} />
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </ScrollView>
    );
  } if (page === 'fields') {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Button title="<" onPress={() => { setPage('upload'); }} />

          <TextInput
            styles={styles.input}
            placeholder="Name"
            onChangeText={(newName) => setName(newName)}
            defaultValue={name}
            returnKeyType="next"
            ref={nameRef}
            onSubmitEditing={() => { emailRef.current.focus(); }}
          />
          <TextInput
            styles={styles.input}
            placeholder="Email"
            onChangeText={(newEmail) => setEmail(newEmail)}
            defaultValue={email}
            returnKeyType="next"
            ref={emailRef}
            onSubmitEditing={() => { platformRef.current.focus(); }}
          />
          <TextInput
            styles={styles.input}
            placeholder="Social Media Platform"
            onChangeText={(newPlatform) => setPlatform(newPlatform)}
            defaultValue={platform}
            returnKeyType="next"
            ref={platformRef}
            onSubmitEditing={() => { accountRef.current.focus(); }}
          />
          <TextInput
            styles={styles.input}
            placeholder="Social Media Account Tag"
            onChangeText={(newEmail) => setAccountTag(newEmail)}
            defaultValue={accountTag}
            returnKeyType="next"
            ref={accountRef}
            onSubmitEditing={() => { artworkRef.current.focus(); }}
          />
          <TextInput
            styles={styles.input}
            placeholder="Artwork Title"
            onChangeText={(newArtwork) => setArtworkTitle(newArtwork)}
            defaultValue={artworkTitle}
            returnKeyType="next"
            ref={artworkRef}
            onSubmitEditing={() => { descriptionRef.current.focus(); }}
          />
          <TextInput
            styles={styles.input}
            placeholder="Artwork Description"
            onChangeText={(newDescription) => setDescription(newDescription)}
            defaultValue={description}
            returnKeyType="next"
            ref={descriptionRef}
            onSubmitEditing={() => { nameRef.current.focus(); }}
          />
          <Button title="+ Add Tags" onPress={() => { setPage('tags'); }} />

          <Button
            title="Submit"
            onPress={submit}
          />
        </View>
      </ScrollView>
    );
  } if (page === 'tags') {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Button
            title="<"
            style={styles.selectedTagBtn}
            onPress={() => {
              setTags(confirmedTags);
              setPage('fields');
            }}
          />
          {Object.keys(tagOptions).map((category) => (
            <View key={category}>
              <Text>{category}</Text>
              {tagOptions[category].map((option) => (
                <TouchableOpacity
                  key={option}
                  activeOpacity={1}
                  style={tags.includes(option) ? styles.selectedTagBtn : styles.unselectedTagBtn}
                  onPress={() => {
                    if (tags.includes(option)) {
                      setTags(tags.filter((tag) => tag !== option));
                    } else {
                      setTags((prev) => ([...prev, option]));
                    }
                  }}
                >
                  <Text style={{ color: tags.includes(option) ? 'white' : 'black' }}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <Button
            title="Clear All"
            onPress={() => {
              setTags([]);
            }}
          />
          <Button
            title="Apply"
            onPress={() => {
              setConfirmedTags(tags);
              setPage('fields');
            }}
          />
        </View>
      </ScrollView>
    );
  }
  return '';
}

export default SubmissionScreen;
