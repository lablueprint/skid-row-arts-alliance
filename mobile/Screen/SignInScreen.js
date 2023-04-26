/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  StyleSheet, Text, TextInput, View, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import { login } from '../redux/sliceAuth';

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
  const dispatch = useDispatch();

  // Store input and navigate to Home screen
  const handleSignIn = async () => {
    try {
      const userData = {
        email,
        password,
      };
      console.log(URL);
      const res = await axios.post(`${URL}/auth/sign-in`, userData);
      // console.log('got res');
      // console.log(res.data);
      if (res.data.error) {
        console.log(res.data.error);
      } else {
        dispatch(login(res.data));
        // console.log('login');
      }
    } catch (err) {
      console.error(err.message);
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
