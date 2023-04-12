/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import { serviceLogin } from '../redux/services';

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

function SignInScreen({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  // Store input and navigate to Home screen
  const handleSignIn = async () => {
    try {
      const userData = {
        email,
        password,
      };
      const res = await axios.post(`${URL}/auth/sign-in`, userData);
      if (res.data.error) {
        console.log(res.data.error);
      } else {
        serviceLogin(res.data);
        navigation.navigate('Home');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
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
      <Button
        title="Sign In"
        onPress={() => {
          handleSignIn();
        }}
      />
      <Button
        title="New User?"
        onPress={() => {
          navigation.navigate('Sign Up');
        }}
      />
      <Button
        title="[DEV] Go to Map"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
}

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default SignInScreen;

SignInScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
