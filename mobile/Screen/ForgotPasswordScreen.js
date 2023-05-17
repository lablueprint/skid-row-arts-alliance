import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import {
  StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity, Dimensions,
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
  link: {
    textDecorationLine: 'underline',
  },
});

function ForgotPasswordScreen({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [page, setPage] = useState(1);

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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.signInContainer}>
        <Text>Forgot Password?</Text>
        <Text>Please enter your email address to receive a verification code.</Text>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPage(2);
            }}
          >
            <Text style={styles.buttonText}>Send code</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Forgot Password');
            }}
          >
            <Text style={styles.link}>Already have a code?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}

export default ForgotPasswordScreen;

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
