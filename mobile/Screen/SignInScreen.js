/* eslint-disable no-console */
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import {
  StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity, Keyboard,
} from 'react-native';
import { login } from '../redux/sliceAuth';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  signInContainer: {
    flexDirection: 'column',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  input: {
    height: 40,
    width: '100%',
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#8A9195',
    backgroundColor: '#F2F2F2',
  },
  inputContainer: {
    flexDirection: 'column',
    height: '18%',
    width: '100%',
    justifyContent: 'space-between',
    borderWidth: 1,
    margin: 20,
  },
  button: {
    height: 40,
    width: '100%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '5%',
    backgroundColor: '#4C4C9B',
  },
});

function SignInScreen({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const dispatch = useDispatch();
  const [hiddenPassword, onChangeHiddenPassword] = useState('');

  const handleChangePassword = (newText) => {
    let newTextWithDots = '';
    newText.split('').forEach((char, index, array) => {
      if (index === array.length - 1) {
        newTextWithDots += char;
      } else {
        newTextWithDots += '•';
      }
    });
    onChangePassword(newText);
    onChangeHiddenPassword(newTextWithDots);
  };

  // Check email is proper format
  const validateEmail = (text) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };

  const checkValidEmail = () => {
    if (!validateEmail(email)) {
      Alert.alert('Please enter a valid email to proceed');
    } else {
      return true;
    }
    return false;
  };

  // Store input and navigate to Home screen
  const handleSignIn = async () => {
    try {
      const userData = {
        email,
        password,
      };
      const res = await axios.post(`${URL}/auth/user-sign-in`, userData);
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        dispatch(login(res.data));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.signInContainer}>
        <Text>Welcome back!</Text>
        <View style={styles.inputContainer}>
          <Text>
            Email
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            autoCapitalize={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>
            Password
          </Text>
          <TextInput
            style={styles.input}
            value={hiddenPassword}
            onChangeText={handleChangePassword}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (checkValidEmail()) {
              handleSignIn();
            }
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <Text>Don&#39;t have an account?</Text>
      <Button
        title="Create an account"
        onPress={() => {
          navigation.navigate('Sign Up');
        }}
      />
    </View>
  );
}

export default SignInScreen;

SignInScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
