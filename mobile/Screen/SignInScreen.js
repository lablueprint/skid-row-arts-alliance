/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import {
  StyleSheet, Text, TextInput, View, Alert, TouchableOpacity,
} from 'react-native';
import { login } from '../redux/sliceAuth';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInContainer: {
    flexDirection: 'column',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpContainer: {
    backgroundColor: '#F8F8F8',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    padding: 10,
    marginTop: 10,
    paddingBottom: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#8A9195',
    backgroundColor: '#F2F2F2',
  },
  inputContainer: {
    flexDirection: 'column',
    height: '15%',
    width: '100%',
    justifyContent: 'space-between',
    margin: 20,
  },
  button: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: '#4C4C9B',
  },
  link: {
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  headerText: {
    fontSize: 25,
    paddingBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
  },
  buttonText: {
    color: '#F8F8F8',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

function SignInScreen({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const dispatch = useDispatch();
  const [bool, setBool] = useState(false);

  const handleBlur = () => {
    setBool(true);
  };

  const handleFocus = () => {
    setBool(false);
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
        <Text style={styles.headerText}>Welcome back!</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Email
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            autoCapitalize={false}
            placeholder="you@email.com"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Password
          </Text>
          <TextInput
            secureTextEntry={bool}
            style={styles.input}
            value={password}
            onChangeText={onChangePassword}
            autoCapitalize={false}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Forgot Password');
            }}
          >
            <Text style={styles.link}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (checkValidEmail()) {
              handleSignIn();
            }
          }}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpContainer}>
        <Text>Dont have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Sign Up');
          }}
        >
          <Text style={styles.link}> Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignInScreen;

SignInScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
