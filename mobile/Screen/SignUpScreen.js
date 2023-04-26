/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

function SignUpScreen({ navigation }) {
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [bio, onChangeBio] = useState('');
  const [instagramProfile, onChangeInstagramProfile] = useState('');
  const [facebookProfile, onChangeFacebookProfile] = useState('');
  const [twitterProfile, onChangeTwitterProfile] = useState('');

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

  return (
    <View style={styles.container}>
      <Text>
        Create an Account
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          First Name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeFirstName}
          value={firstName}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Last Name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeLastName}
          value={lastName}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Email
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Password
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Bio
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeBio}
          value={bio}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Instagram Username
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeInstagramProfile}
          value={instagramProfile}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Facebook Profile URL
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeFacebookProfile}
          value={facebookProfile}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Twitter Username
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTwitterProfile}
          value={twitterProfile}
        />
      </View>
      <Button
        title="Sign Up"
        onPress={() => {
          handleSignUp();
        }}
      />
      <Button
        title="Existing User?"
        onPress={() => {
          navigation.navigate('Sign In');
        }}
      />
    </View>
  );
}

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default SignUpScreen;

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
