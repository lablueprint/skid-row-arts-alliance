import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, TextInput, Text, View, ScrollView, Button, Image,
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
});

function SubmissionScreen() {
  const [submissions, setSubmissions] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState('');
  const [accountTag, setAccountTag] = useState('');
  const [artworkTitle, setArtworkTitle] = useState('');
  const [description, setDescription] = useState('');

  const nameRef = useRef();
  const emailRef = useRef();
  const platformRef = useRef();
  const accountRef = useRef();
  const artworkRef = useRef();
  const descriptionRef = useRef();

  const [files, setFiles] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);

  function getType(uri, fileType) {
    const splitted = uri.split('.');
    const uriType = splitted[splitted.length - 1];
    if (uriType === 'mov') {
      return `${fileType}/quicktime`;
    }
    return `${fileType}/${uriType}`;
  }

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
    const filesToSubmit = [];
    files.forEach((f) => filesToSubmit.push(f));
    if (thumbnails.length > 0) {
      filesToSubmit.push({ uri: thumbnails[0], type: 'image/jpg' });
    } else {
      filesToSubmit.push({ uri: 'default', type: 'image/jpg' });
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
      });
      setSubmissions((prev) => ([...prev, res.data]));
      clearInput();
    } catch (err) {
      console.error(err);
    }
  };

  const addFile = async (fileURI, fileType) => {
    setFiles((prev) => ([...prev, { uri: fileURI, type: fileType }]));
    if (fileType.includes('image')) {
      setThumbnails((prev) => ([...prev, fileURI]));
    } else if (fileType.includes('video')) {
      try {
        const res = await VideoThumbnails.getThumbnailAsync(fileURI);
        setThumbnails((prev) => ([...prev, res.uri]));
      } catch (err) {
        console.error(err);
      }
    } else { // Implement default thumbnail in future if we have additional file types (e.g. audio)

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

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Button title="Clear Selections" onPress={clearInput} />
          <Button title="Camera Roll" onPress={pickImage} />
          <Button title="Use Camera" onPress={openCamera} />
          <Button title="File Selector" onPress={openFileSelector} />

          {thumbnails.map((uri) => (
            <Image
              source={{ uri }}
              key={uri}
              style={{ width: 200, height: 200 }}
            />
          ))}
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
          <Button
            title="Submit"
            onPress={submit}
          />
        </View>
      </View>
      <View style={styles.submissionsContainer}>
        {submissions.map((submission) => (
          <View style={styles.submission} key={submission._id}>
            <Text>
              Name:
              {' '}
              {submission.name}
            </Text>
            <Text>
              Email:
              {' '}
              {submission.email}
            </Text>
            <Text>
              Social Media Platform:
              {' '}
              {submission.socials.platform}
            </Text>
            <Text>
              Social Media Account Tag:
              {' '}
              {submission.socials.tag}
            </Text>
            <Text>
              Artwork Title:
              {' '}
              {submission.title}
            </Text>
            <Text>
              Artwork Description:
              {' '}
              {submission.description}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default SubmissionScreen;
