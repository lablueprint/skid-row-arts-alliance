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

  const [name, setName] = useState('Ryan Kim');
  const [email, setEmail] = useState('ryanswkim2003@gmail.com');
  const [platform, setPlatform] = useState('Instagram');
  const [accountTag, setAccountTag] = useState('@r.yankim');
  const [artworkTitle, setArtworkTitle] = useState('My Art');
  const [description, setDescription] = useState('So cool!');

  const nameRef = useRef();
  const emailRef = useRef();
  const platformRef = useRef();
  const accountRef = useRef();
  const artworkRef = useRef();
  const descriptionRef = useRef();

  const [files, setFiles] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);

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

  const read = async (file, reader) => {
    try {
      fetch(file)
        .then((res) => res.blob())
        .then((blob) => reader.readAsDataURL(blob))
        .catch((e) => console.error(e));
    } catch (err) {
      console.error(err);
    }
  };
  const submit = async () => {
    const fileArray = files.map((file) => {
      const fReader = new FileReader();
      return new Promise((resolve) => {
        fReader.addEventListener('loadend', async () => {
          resolve(fReader.result.replace(/^.*base64,/, ''));
        });
        read(file.uri, fReader);
      });
    });

    const streams = await Promise.all(fileArray).catch((err) => console.error(err));
    const objects = [];
    for (let i = 0; i < files.length; i += 1) {
      objects.push({ uri: streams[i], type: files[i].type });
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
    console.log(fileURI);
    setFiles((prev) => ([...prev, { uri: fileURI, type: fileType }]));
    if (fileType.includes('image')) {
      setThumbnails((prev) => ([...prev, fileURI]));
    } else if (fileType.includes('video')) {
      try {
        const { videoToImageURI } = await VideoThumbnails.getThumbnailAsync(fileURI);
        setThumbnails((prev) => ([...prev, videoToImageURI]));
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
      addFile(result.assets[0].uri, result.assets[0].type);
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
      addFile(result.assets[0].uri, result.assets[0].type);
    }
  };

  const openDocSelector = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: true,
      copyToCacheDirectory: true,
    });

    if (result.type === 'success') {
      addFile(result.uri, result.mimeType);
    }
  };

  const getSubmissions = async () => {
    const result = await axios.get(`${URL}/submissions/get`);
    setSubmissions(result.data);
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  console.log(thumbnails);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Button title="Clear" onPress={clearInput} />
          <Button title="Image" onPress={pickImage} />
          <Button title="Camera" onPress={openCamera} />
          <Button title="File" onPress={openDocSelector} />

          {thumbnails.map((uri, i) => (
            <Image
              source={{ uri }}
              key={i}
              style={{ width: 200, height: 200 }}
            />
          ))}
          <TextInput
            styles={styles.input}
            placeholder="Name"
            onChangeText={(newName) => setName(newName)}
            defaultValue={name}
            ref={nameRef}
          />
          <TextInput
            styles={styles.input}
            placeholder="Email"
            onChangeText={(newEmail) => setEmail(newEmail)}
            defaultValue={email}
            ref={emailRef}
          />
          <TextInput
            styles={styles.input}
            placeholder="Social Media Platform"
            onChangeText={(newPlatform) => setPlatform(newPlatform)}
            defaultValue={platform}
            ref={platformRef}
          />
          <TextInput
            styles={styles.input}
            placeholder="Social Media Account Tag"
            onChangeText={(newEmail) => setAccountTag(newEmail)}
            defaultValue={accountTag}
            ref={accountRef}
          />
          <TextInput
            styles={styles.input}
            placeholder="Artwork Title"
            onChangeText={(newArtwork) => setArtworkTitle(newArtwork)}
            defaultValue={artworkTitle}
            ref={artworkRef}
          />
          <TextInput
            styles={styles.input}
            placeholder="Artwork Description"
            onChangeText={(newDescription) => setDescription(newDescription)}
            defaultValue={description}
            ref={descriptionRef}
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
