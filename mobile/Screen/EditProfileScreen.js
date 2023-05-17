import React, { useState, useEffect } from 'react';
import { URL } from '@env';
import axios from 'axios';
import {
  StyleSheet, Text, TextInput, View, Button, Image, ScrollView, ImageBackground,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { serviceUpdateUser } from '../redux/services';

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 200 / 2,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  row: {
    aspectRatio: 1,
    overflow: 'hidden',
    height: '35%', // this changes size of avatar
    width: '50%',
    borderWidth: 2,
    alignSelf: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set the overlay color here
  },
  nameContainer: {
    width: '90%',
    backgroundColor: '#F2F2F2',
    height: 40,
    alignSelf: 'center',
    borderRadius: 8,
    borderColor: '#8A9195',
    borderWidth: 0.5,
  },
  container: {
    backgroundColor: '#ffffff',
  },
  bioContainer: {
    width: '90%',
    backgroundColor: '#F2F2F2',
    height: 40,
    alignSelf: 'center',
    borderRadius: 8,
    borderColor: '#8A9195',
    borderWidth: 0.5,
  },
});

const updatedUser = {
  email: 'updated-email@yahoo.com',
  password: 'updated-password',
  firstName: 'Caroline',
  lastName: 'Deb',
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

const handleUpdate = async () => {
  try {
    serviceUpdateUser(updatedUser);
    // submitProfilePicture();
    console.log('hi');
    console.log(3, updatedUser);
    const test = await axios.patch(`${URL}/user/update/63e5cef456a64046d45ae8cf`, {
      updatedUser,
    });
    console.log(test.data.email); // prints out info from Mongo
  } catch (err) {
    console.error(err);
  }
};

function EditProfileScreen() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { bio } = currentUser;
  const [newBio, setNewBio] = useState(bio);

  const handleTextChange = () => {
    console.log('balls');
    const updatedUser2 = { ...currentUser, bio: newBio };
    setNewBio(newBio);
  };

  return(
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: 'https://images.pexels.com/photos/1454769/pexels-photo-1454769.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}
          resizeMode='cover'
          style={styles.avatar}
        />
        <View style={styles.overlay} />
      </View>
      <Text>Name</Text>
      <View style={styles.nameContainer}>
        <Text>{currentUser.firstName} {currentUser.lastName}</Text>
      </View>
      <Text>Bio</Text>
      <View style={styles.bioContainer}>
        <TextInput
          // style={{ height: Math.max(40, currentUser.bio.length * 20) }}
          multiline={true}
          value={newBio}
          onChangeText={setNewBio}
          placeholder="Type something..."
        />
      </View>
      <Button title="Save" onPress={handleUpdate} />
    </View>
	)
}

export default EditProfileScreen;
