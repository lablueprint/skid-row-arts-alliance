import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import {
  StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity, Dimensions,
} from 'react-native';
import { login } from '../redux/sliceAuth';

function ForgotPasswordScreen({ navigation }) {

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
  link: {
    textDecorationLine: 'underline',
  },
});

function ForgotPasswordScreen({ navigation }) {
  const [page, setPage] = useState(1);

  const validateEmail = (text) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };

  return (
    <View>
      <Text>Forgot password</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Sign In');
        }}
      >
        <Text> Log in</Text>
      </TouchableOpacity>
    </View>

  );
}

export default ForgotPasswordScreen;

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
