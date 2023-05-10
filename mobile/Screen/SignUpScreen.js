/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button, Alert, Keyboard, Image, TouchableOpacity,
} from 'react-native';
import HeaderBackButton from '@react-navigation/stack';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import * as ImagePicker from 'expo-image-picker';
import DotTextInput from '../Components/DotTextInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
    paddingBottom: '20%',
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 15,
    marginVertical: 5,
  },
  socialInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 15,
    marginVertical: 5,
  },
  inputContainer: {
    flex: 8,
    backgroundColor: '#F8F8F8',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: '65%',
    marginHorizontal: '15%',
    marginTop: '15%',
  },
  button: {
    backgroundColor: '#4C4C9B',
    borderRadius: 3,
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '5%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 29,
  },
  inputLabel: {
    fontSize: 16,
  },
  logInContainer: {
    flex: 2,
    backgroundColor: '#F8F8F8',
    width: '60%',
    flexDirection: 'row',
  },
  link: {
    textDecorationLine: 'underline',
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
  extrasContainer: {
    flex: 1,
    width: '60%',
    textAlign: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: 20,
    height: 20,
  },
  backButtonPosiion: {
    alignItems: 'flex-start',
    width: '100%',
    marginLeft: '15%',
  },
  socialContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '20%',
    justifyContent: 'space-between',
    borderColor: 'red',
    marginVertical: '5%',
  },
  blob: {
    width: '100%',
  },
});

function SignUpScreen({ navigation }) {
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirmPassword, onChangeConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const [bio, onChangeBio] = useState('');
  const [instagramProfile, onChangeInstagramProfile] = useState('');
  const [facebookProfile, onChangeFacebookProfile] = useState('');
  const [twitterProfile, onChangeTwitterProfile] = useState('');
  const [page, setPage] = useState(1);

  const [socialPlatform, setSocialPlatform] = useState('');
  const [socialTag, onChangeSocialTag] = useState('');

  // Check email is proper format
  const validateEmail = (text) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };

  // Check name inputs are filled before moving to next screen
  const checkNameInputs = () => {
    if (firstName === '') {
      Alert.alert('Please enter a first name to proceed');
    } else {
      return true;
    }
    return false;
  };

  // Check account inputs are filled appropriately before moving to next screen
  const checkAccountInputs = () => {
    if (email === '') {
      Alert.alert('Please enter an email to proceed');
    } else if (!validateEmail(email)) {
      Alert.alert('Please enter a valid email to proceed');
    } else if (password === '') {
      Alert.alert('Please enter a password to proceed');
    } else if (password.length < 6) {
      Alert.alert('Password must be longer than 5 characters');
    } else if (password !== confirmPassword) {
      Alert.alert('Password Confirmation does not match Password');
    } else {
      return true;
    }
    return false;
  };

  // Select profile pic
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

  // Store input and navigate to Home screen
  const handleSignUp = async () => {
    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        bio,
        socialMedia: {
          instagram: instagramProfile,
          facebook: facebookProfile,
          twitter: twitterProfile,
        },
        savedEvents: [],
        savedArtwork: [],
        userArtwork: [],
      };
      const res = await axios.post(`${URL}/auth/sign-up`, userData);
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        navigation.navigate('Sign In');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  if (page === 1) {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.headerText}>Create an account</Text>
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>
              First Name
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeFirstName}
              value={firstName}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>
              Last Name
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeLastName}
              value={lastName}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (checkNameInputs()) {
                Keyboard.dismiss();
                setPage(2);
              }
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logInContainer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Sign In');
            }}
          >
            <Text style={styles.link}> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (page === 2) {
    return (
      <View style={styles.container}>
        <View style={styles.backButtonPosiion}>
          <TouchableOpacity
            onPress={() => {
              setPage(1);
            }}
          >
            <Image
              source={require('../assets/favicon.png')}
              style={styles.backButton}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.headerText}>Create an account</Text>
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>
              Email
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={email}
              autoCapitalize={false}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>
              Password
            </Text>
            <DotTextInput
              value={password}
              onChangeText={onChangePassword}
              customStyle={styles.input}
            />
          </View>
          <Text>6 or more characters</Text>
          <View style={styles.textContainer}>
            <Text style={styles.inputLabel}>
              Confirm Password
            </Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              onChangeText={onChangeConfirmPassword}
              value={confirmPassword}
              autoCapitalize={false}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (checkAccountInputs()) {
                Keyboard.dismiss();
                setPage(3);
              }
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (page === 3) {
    return (
      <View style={styles.container}>
        <View style={styles.backButtonPosiion}>
          <TouchableOpacity
            onPress={() => {
              setPage(2);
            }}
          >
            <Image
              source={require('../assets/favicon.png')}
              style={styles.backButton}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.extrasContainer}>
          <Text style={styles.headerText}>Add a Profile Picture</Text>
          <Button title="Set Profile Picture" onPress={pickImage} />
          {image !== '' ? (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          ) : ''}
        </View>
        <View style={styles.extrasContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPage(4);
            }}
          >
            <Text style={styles.buttonText}>Add Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPage(4);
            }}
          >
            <Text style={styles.buttonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (page === 4) {
    return (
      <View style={styles.container}>
        <View style={styles.backButtonPosiion}>
          <TouchableOpacity
            onPress={() => {
              setPage(3);
            }}
          >
            <Image
              source={require('../assets/favicon.png')}
              style={styles.backButton}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.headerText}>What do you want people to know about you?</Text>
          <View style={styles.textContainer}>
            <Text>Share anything you would like!</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeBio}
              value={bio}
              maxLength={150}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPage(5);
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPage(5);
            }}
          >
            <Text style={styles.buttonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.backButtonPosiion}>
        <TouchableOpacity
          onPress={() => {
            setPage(2);
          }}
        >
          <Image
            source={require('../assets/favicon.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>
          Add social media tag
        </Text>
        <Text>
          Where else can people find you?
        </Text>
        <View style={styles.socialContainer}>
          <Image
            source={require('../assets/instagram.png')}
          />
          <TextInput
            style={styles.socialInput}
            onChangeText={onChangeInstagramProfile}
            value={instagramProfile}
          />
        </View>
        <View style={styles.socialContainer}>
          <Image
            source={require('../assets/facebook.png')}
          />
          <TextInput
            style={styles.socialInput}
            onChangeText={onChangeFacebookProfile}
            value={facebookProfile}
          />
        </View>
        <View style={styles.socialContainer}>
          <Image
            source={require('../assets/twitter.png')}
          />
          <TextInput
            style={styles.socialInput}
            onChangeText={onChangeTwitterProfile}
            value={twitterProfile}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPage(5);
          }}
        >
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPage(1);
          }}
        >
          <Text style={styles.buttonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignUpScreen;

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
