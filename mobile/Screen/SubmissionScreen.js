import React, { useState, useEffect } from 'react';
import {
  StyleSheet, TextInput, Text, View, ScrollView, Button, Image,
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

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

  const [images, setImages] = useState([]);

  function clearInput() {
    setName('');
    setEmail('');
    setPlatform('');
    setAccountTag('');
    setArtworkTitle('');
    setDescription('');
  }
  const reader = new FileReader();
  reader.addEventListener('loadend', async () => {
    const blob = reader.result.replace(/^data:image\/\w+;base64,/, '');
    const res = await axios.post(`${URL}/submissions/post`, {
      name,
      email,
      socials: {
        platform,
        tag: accountTag,
      },
      title: artworkTitle,
      description,
      blob,
    });
    setSubmissions((prev) => ([...prev, res.data]));
    clearInput();
  });

  const submit = async () => {
    try {
      fetch(images[0])
        .then((res) => res.blob())
        .then((blob) => reader.readAsDataURL(blob))
        .catch((e) => console.error(e));
    } catch (err) {
      console.error(err);
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
      setImages((prev) => ([...prev, result.assets[0].uri]));
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
      setImages((prev) => ([...prev, result.assets[0].uri]));
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
          <Button title="Image" onPress={pickImage} />
          <Button title="Camera" onPress={openCamera} />
          {images.map((src) => (
            <Image
              source={{ uri: src }}
              key={src}
              style={{ width: 200, height: 200 }}
            />
          ))}
          <TextInput
            styles={styles.input}
            placeholder="Name"
            onChangeText={(newName) => setName(newName)}
            defaultValue={name}
          />
          <TextInput
            styles={styles.input}
            placeholder="Email"
            onChangeText={(newEmail) => setEmail(newEmail)}
            defaultValue={email}
          />
          <TextInput
            styles={styles.input}
            placeholder="Social Media Platform"
            onChangeText={(newPlatform) => setPlatform(newPlatform)}
            defaultValue={platform}
          />
          <TextInput
            styles={styles.input}
            placeholder="Social Media Account Tag"
            onChangeText={(newEmail) => setAccountTag(newEmail)}
            defaultValue={accountTag}
          />
          <TextInput
            styles={styles.input}
            placeholder="Artwork Title"
            onChangeText={(newArtwork) => setArtworkTitle(newArtwork)}
            defaultValue={artworkTitle}
          />
          <TextInput
            styles={styles.input}
            placeholder="Artwork Description"
            onChangeText={(newDescription) => setDescription(newDescription)}
            defaultValue={description}
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
