import React, { useState, useEffect } from 'react';
import { URL } from '@env';
import {
  useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_500Medium 
} from '@expo-google-fonts/montserrat';
import axios from 'axios';
import {
  StyleSheet, Text, TextInput, View, Button, Image, ScrollView, Modal, Pressable, ImageBackground,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/sliceAuth';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  headerContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '13%',
  },
  cancelButtonHeader: {
    borderWidth: 1,
    borderColor: '#4C4C9B',
    borderRadius: 4,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 6,
    paddingBottom: 6,
    width: '25%',
    alignItems: 'center',
  },
  cancelTextHeader: {
    fontStyle: 'normal',
    fontSize: 15,
    lineHeight: 17,
    fontFamily: 'MontserratSemiBold',
    color: '#4C4C9B',
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#4C4C9B',
    borderRadius: 4,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 6,
    paddingBottom: 6,
    width: '25%',
    alignItems: 'center',
    backgroundColor: '#4C4C9B',
  },
  saveText: {
    fontStyle: 'normal',
    color: '#F8F8F8',
    fontSize: 15,
    lineHeight: 0,
    fontFamily: 'MontserratSemiBold',
  },
  editProfileText: {
    fontFamily: 'MontserratMedium',
    color: 'black',
    fontSize: 20,
    lineHeight: 24,
    flex: 2,
    alignSelf: 'center',
    marginLeft: '10%',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 200 / 2,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  row: {
    marginTop: '6%',
    aspectRatio: 1,
    overflow: 'hidden',
    height: '20%', // this changes size of avatar
    width: '50%',
    // borderWidth: 2,
    alignSelf: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    borderRadius: 200 / 2,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
  },
  editLogo: {
    color: 'black',
    width: '25%',
    height: '25%',
    position: 'absolute',
    top: 43,
    left: 43,
  },
  nameText: {
    marginTop: '7%',
    marginLeft: '5%',
    marginBottom: '1.3%',
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  nameRowContainer: {
    width: '90%',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  nameContainer: {
    width: '48%',
    backgroundColor: '#F2F2F2',
    height: '85%',
    alignSelf: 'center',
    borderRadius: 8,
    borderColor: '#8A9195',
    borderWidth: 0.5,
    marginLeft: 6,
    marginRight: 6,
    justifyContent: 'center',
  },
  nameTextInput: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: '#53595C',
    paddingLeft: '7%',
  },
  bioText: {
    marginTop: '6%',
    marginLeft: '5%',
    marginBottom: '1.3%',
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  bioContainer: {
    marginTop: '1.1%',
    width: '90%',
    backgroundColor: '#F2F2F2',
    height: '27.5%',
    alignSelf: 'center',
    borderRadius: 8,
    borderColor: '#8A9195',
    borderWidth: 0.5,
  },
  bioTextInput: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: '#53595C',
    paddingLeft: '4%',
    paddingRight: '4%',
    paddingTop: '3%',
  },
  wordCount: {
    marginTop: 5,
    color: 'gray',
    position: 'absolute',
    top: 140,
    left: 295,
  },
  sociaMediaHandlesText: {
    marginTop: '6%',
    marginLeft: '5%',
    marginBottom: '1.3%',
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  socialMediaContainer: {
    width: '90%',
    backgroundColor: '#F2F2F2',
    height: '29%',
    alignSelf: 'center',
    borderRadius: 8,
    borderColor: '#8A9195',
    borderWidth: 0.5,
  },
  socialMediaRow: {
    width: '100%',
    height: '33.33333%',
    backgroundColor: 'transparent',
    borderColor: '#8A9195',
    borderWidth: 0,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
  },
  socialMediaRowBottom: {
    width: '100%',
    height: '33.33333%',
    backgroundColor: 'transparent',
    borderColor: '#8A9195',
    borderWidth: 0,
    borderBottomWidth: 0,
    justifyContent: 'center',
  },
  socialMediaLogo: {
    width: '6%',
    height: '5%',
    marginRight: 10,
    overflow: 'visible',
    alignSelf: 'center',
    marginLeft: 15,
  },
  socialRowText: {
    fontFamily: 'Montserrat',
    fontSize: 15,
    color: '#53595C',
    paddingLeft: 0,
  },
  manageAccountText: {
    marginTop: '6%',
    marginLeft: '5%',
    marginBottom: '1.3%',
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  deleteAccountButton: {
    width: '55%',
    marginLeft: '5%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D50D0D',
    paddingRight: 18,
    paddingLeft: 18,
    paddingTop: 9,
    paddingBottom: 9,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '65%',
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 27,
    paddingBottom: 27,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 26,
    fontFamily: 'Montserrat',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#424288',
    borderRadius: 4,
    paddingRight: 18,
    paddingLeft: 18,
    paddingTop: 4,
    paddingBottom: 4,
    width: '49%',
    alignItems: 'center',
    marginRight: 10,
  },
  cancelText: {
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 0,
    fontFamily: 'MontserratSemiBold',
    color: '#4C4C9B',
  },
  yesButton: {
    borderWidth: 1,
    borderColor: '#4C4C9B',
    borderRadius: 4,
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 4,
    paddingBottom: 4,
    width: '49%',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#4C4C9B',
  },
  yesText: {
    fontStyle: 'normal',
    color: '#F8F8F8',
    fontSize: 18,
    lineHeight: 0,
    fontFamily: 'MontserratSemiBold',
  },
});

function EditProfileScreen({
  navigation,
}) {
  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });

  const currentUser = useSelector((state) => state.auth);

  const [currFirstName, setFirstName] = useState('');
  const [currLastName, setLastName] = useState('');

  const [currBio, setBio] = useState('');
  const [wordCount, setWordCount] = useState(currBio ? currBio.split(/\s+/).length : 0);

  const [currFacebook, setFacebook] = useState('');
  const [currInstagram, setInstagram] = useState('');
  const [currTwitter, setTwitter] = useState('');

  const [showModal, setShowModal] = useState(false);
  // const [showSaveModal, setShowSaveModal] = useState(false);

  const dispatch = useDispatch();

  const handleAvatarChange = () => {
    console.log('pressed!');
  };

  const handleFirstNameChange = (text) => {
    setFirstName(text);
  };

  const handleLastNameChange = (text) => {
    setLastName(text);
  };

  const handleBioChange = (text) => {
    if (text.split(/\s+/).length <= 150) {
      setBio(text);
      setWordCount(text.split(/\s+/).length);
    }
  };

  const getUserData = async () => {
    try {
      const res = await axios.get(`${URL}/user/getUser/${currentUser.id}`);
      setFirstName(res.data.msg.firstName);
      setLastName(res.data.msg.lastName);
      setBio(res.data.msg.bio);
      setFacebook(res.data.msg.socialMedia.facebook);
      setInstagram(res.data.msg.socialMedia.instagram);
      setTwitter(res.data.msg.socialMedia.twitter);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleUpdate = async () => {
    navigation.navigate('Profile');
    try {
      const updatedUser = {
        firstName: currFirstName,
        lastName: currLastName,
        bio: currBio,
        socialMedia: {
          facebook: currFacebook,
          instagram: currInstagram,
          twitter: currTwitter,
        },
      };
      await axios.patch(`${URL}/user/update/${currentUser.id}`, {
        updatedUser,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);
    dispatch(logout(currentUser));
    try {
      await axios.delete(`${URL}/user/delete/${currentUser.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleCancelHeader = () => {
    navigation.navigate('Profile');
  };

  useEffect(() => {
    getUserData();
  }, []);

  return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.cancelButtonHeader} onPress={handleCancelHeader}>
          <Text style={styles.cancelTextHeader}>Cancel</Text>
        </Pressable>
        <Text style={styles.editProfileText}>Edit Profile</Text>
        <Pressable style={styles.saveButton} onPress={handleUpdate}>
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.row}>
          <Pressable onPress={handleAvatarChange}>
            <ImageBackground source={{ uri: 'https://images.pexels.com/photos/1454769/pexels-photo-1454769.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}
              resizeMode='cover'
              style={styles.avatar}
            />
            <View style={styles.overlay} />
            <Image
              source={require('../assets/edit.png')}
              style={styles.editLogo}
            />
          </Pressable>
        </View>
        <Text style={styles.nameText}>Name</Text>
        <View style={styles.nameRowContainer}>
          <View style={styles.nameContainer}>
            <TextInput
                multiline={false}
                value={currFirstName}
                onChangeText={handleFirstNameChange}
                placeholder="Enter first name..."
                style={styles.nameTextInput}
              />
          </View>
          <View style={styles.nameContainer}>
            <TextInput
                multiline={false}
                value={currLastName}
                onChangeText={handleLastNameChange}
                placeholder="Enter last name..."
                style={styles.nameTextInput}
              />
          </View>
        </View>
        <Text style={styles.bioText}>Bio</Text>
        <View style={styles.bioContainer}>
          <TextInput
            multiline={true}
            value={currBio}
            onChangeText={handleBioChange}
            placeholder="Enter bio..."
            style={styles.bioTextInput}
          />
          <Text style={styles.wordCount}>{wordCount}/150 words</Text>
        </View>
        <Text style={styles.sociaMediaHandlesText}>Social Media Handles</Text>
        <View style={styles.socialMediaContainer}>
          <View style={styles.socialMediaRow}>
            <View style={{ flex: 0, flexDirection: 'row' }}>
              <Image
                source={require('../assets/facebook.png')}
                style={styles.socialMediaLogo}
              />
              <TextInput
                multiline={false}
                value={currFacebook}
                onChangeText={setFacebook}
                placeholder="Enter Facebook Name..."
                style={styles.socialRowText}
              />
            </View>
          </View>
          <View style={styles.socialMediaRow}>
            <View style={{ flex: 0, flexDirection: 'row' }}>
              <Image
                source={require('../assets/instagram.png')}
                style={styles.socialMediaLogo}
              />
              <TextInput
                multiline={false}
                value={currInstagram}
                onChangeText={setInstagram}
                placeholder="Enter Instagram Handle..."
                style={styles.socialRowText}
              />
            </View>
          </View>
          <View style={styles.socialMediaRowBottom}>
            <View style={{ flex: 0, flexDirection: 'row' }}>
              <Image
                source={require('../assets/twitter.png')}
                style={styles.socialMediaLogo}
              />
              <TextInput
                multiline={false}
                value={currTwitter}
                onChangeText={setTwitter}
                placeholder="Enter Instagram Handle..."
                style={styles.socialRowText}
              />
            </View>
          </View>
        </View>
        <Text style={styles.manageAccountText}>Manage Account</Text>
        <Pressable style={styles.deleteAccountButton} onPress={handleDelete}>
          <Text style={styles.cancelText}>Delete Account</Text>
        </Pressable>
        <Modal visible={showModal} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
              <View style={styles.buttonContainer}>
                <Pressable style={styles.cancelButton} onPress={handleCancelDelete}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.yesButton} onPress={handleConfirmDelete}>
                  <Text style={styles.yesText}>Yes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
	)
}

export default EditProfileScreen;
