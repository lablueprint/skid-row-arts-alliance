import React, { useState, useEffect } from 'react';
import { URL } from '@env';
import axios from 'axios';
import {
  StyleSheet, Text, TextInput, View, Button, Image, ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { serviceUpdateUser } from '../redux/services';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
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
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function ProfileScreen({
  navigation,
}) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [platform, setPlatform] = useState('');
  const [tag, onChangeTag] = useState('');
  const dispatch = useDispatch();
  const [profilePicture, onChangeProfilePicture] = useState([]);

  const [submissions, setSubmissions] = useState([]);
  const [image, setImage] = useState('');

  function clearInput() {
    setImage('');
  }

  const handleClear = () => {
    serviceUpdateUser({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      bio: '',
      socialMedia: {
        platform: '',
        accountTag: '',
      },
      profilePicture: '',
      savedEvents: [''],
      savedArtwork: [''],
      userArtwork: [''],
    });
  };

  const updatedUser = {
    email: 'updated-email@yahoo.com',
    password: 'updated-password',
    firstName: 'Caroline',
    lastName: 'updated-lastname',
    bio: 'hater of mobile dev',
    socialMedia: {
      platform: 'updated-instagram',
      accountTag: 'updated-accounttag',
    },
    profilePicture: 'updated-profilepicture',
    savedEvents: ['updated-event1', 'updated-event2'],
    savedArtwork: ['updated-artwork1', 'updated-artwork2'],
    userArtwork: ['updated-userartwork1', 'updated-userartwork2'],
  };

  const reader = new FileReader();
  reader.addEventListener('loadend', async () => {
    const blob = reader.result.replace(/^.*base64,/, '');
    console.log(updatedUser);
    console.log(currentUser);
    const res = await axios.patch(`${URL}/user/addProfilePicture/63e33e2f578ad1d80bd2a347`, {
      // need to change hard coded ID
      blob,
    });
    // console.log(1, res);
    // console.log(currentUser);
    console.log('pee');
    clearInput();
    console.log('poop');
  });

  const submitProfilePicture = async () => {
    try {
      fetch(image)
        .then((res) => res.blob())
        .then((blob) => reader.readAsDataURL(blob))
        .catch((e) => console.error(e));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      // console.log('updatedUser:', updatedUser);
      serviceUpdateUser(updatedUser);
      // submitProfilePicture();
      console.log('hi');
      console.log(3, updatedUser);
      const test = await axios.patch(`${URL}/user/update/63e5cef456a64046d45ae8cf`, {
        updatedUser,
      });
      console.log(test.data.email);  //prints out info from Mongo
      // console.log('hi');
    } catch (err) {
      console.error(err);
    }
    console.log('ii');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
      setImage(result.assets[0].uri);
    }
  };

  const getSubmissions = async () => {
    const result = await axios.get(`${URL}/getProfilePicture/${updatedUser._id}`);
    setSubmissions(result.data);
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  // Display and edit profile info
  return (
    <View style={styles.container}>
      <View style={{
        paddingTop: 30,
        paddingBottom: 50,
      }}
      >
        <Button
          title="Sign Out"
          onPress={() => {
            handleSignOut();
          }}
        />
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Name: </Text>
          currentUser.userName
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Email: </Text>
          currentUser.userEmail
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Social Platform: </Text>
          currentUser.userSocialPlatform
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Social Tag: </Text>
          currentUser.userSocialTag
        </Text>
      </View>
      <View style={{ paddingBottom: 40 }}>
        <Text style={{ fontWeight: '800', fontSize: 25, paddingBottom: 10 }}>
          Edit Profile Fields
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ paddingRight: 10 }}>
            Name:
          </Text>
          <TextInput
            placeholder="Name"
            onChangeText={onChangeName}
            value={name}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ paddingRight: 10 }}>
            Email:
          </Text>
          <TextInput
            placeholder="Email"
            onChangeText={onChangeEmail}
            value={email}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>
            Social Platform:
          </Text>
          <Picker
            selectedValue={platform}
            style={{ height: 200, width: 150 }}
            onValueChange={(itemValue) => setPlatform(itemValue)}
          >
            <Picker.Item label="Instagram" value="instagram" />
            <Picker.Item label="Twitter" value="twitter" />
            <Picker.Item label="Facebook" value="facebook" />
          </Picker>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ paddingRight: 10 }}>
            Social Tag:
          </Text>
          <TextInput
            placeholder="Account Tag"
            onChangeText={onChangeTag}
            value={tag}
          />
        </View>
      </View>
      <Button title="Save" onPress={handleUpdate} />
      <Button title="Clear" onPress={handleClear} />
    </View>
  );
}

export default ProfileScreen;
