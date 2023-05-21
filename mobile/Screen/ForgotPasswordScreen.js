import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import {
  StyleSheet, Text, TextInput, View, Image, Alert, TouchableOpacity,
} from 'react-native';
import { login } from '../redux/sliceAuth';

const BackButton = require('../assets/backArrow.png');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'green',
  },
  signInContainer: {
    flexDirection: 'column',
    width: '70%',
    height: '80%',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'blue',
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
    borderColor: 'red',
    margin: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  backButton: {
    width: 20,
    height: 20,
  },
  backButtonPosiion: {
    alignItems: 'flex-start',
    width: '100%',
    marginLeft: '10%',
    marginTop: '10%',
  },
  headerText: {
    fontSize: 25,
  },
  inputLabel: {
    fontSize: 15,
  },
  buttonText: {
    color: '#F8F8F8',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  link: {
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
});

function ForgotPasswordScreen({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirmPassword, onChangeConfirmPassword] = useState('');
  const [resetCode, onChangeResetCode] = useState('');
  const [bool, setBool] = useState(false);

  const handleBlur = () => {
    setBool(true);
  };

  const handleFocus = () => {
    setBool(false);
  };

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

  if (page === 2) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.backButtonPosiion}>
          <TouchableOpacity
            onPress={() => {
              setPage(1);
            }}
          >
            <Image
              source={BackButton}
              style={styles.backButton}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.signInContainer}>
          <Text style={styles.headerText}>Verify Your Email</Text>
          <Text>Please enter your email address below.</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            autoCapitalize={false}
          />
          <Text>Please enter the 4-digit code sent to yourname@gmail.com.</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeResetCode}
              value={resetCode}
              autoCapitalize={false}
            />
            <TouchableOpacity
              onPress={() => {
                setPage(2);
              }}
            >
              <Text style={styles.link}>Resend code?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setPage(3);
              }}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (page === 3) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.backButtonPosiion}>
          <TouchableOpacity
            onPress={() => {
              setPage(2);
            }}
          >
            <Image
              source={BackButton}
              style={styles.backButton}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.signInContainer}>
          <Text>Create New Password</Text>
          <Text>Your new password needs to be different from your old one!</Text>
          <View style={styles.inputContainer}>
            <Text>
              New Password
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
            <Text>6 or more characters</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text>
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
              navigation.navigate('Sign In');
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.backButtonPosiion}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Sign In');
          }}
        >
          <Image
            source={BackButton}
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.signInContainer}>
        <Text style={styles.headerText}>Forgot Password?</Text>
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
              setPage(2);
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
