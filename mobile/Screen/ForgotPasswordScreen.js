import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import {
  StyleSheet, Text, TextInput, View, Image, Alert, TouchableOpacity, Pressable,
} from 'react-native';

const BackButton = require('../assets/backArrow.png');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInContainer: {
    flexDirection: 'column',
    width: '70%',
    height: '80%',
    alignItems: 'center',
    textAlign: 'center',
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
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
  headerText: {
    fontSize: 25,
    paddingBottom: 10,
  },
  inputLabel: {
    fontSize: 15,
    marginBottom: 10,
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
  digitInput: {
    borderColor: '#1D763C',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    height: 70,
    width: 50,
    justifyContent: 'center',
    textAlign: 'center',
  },
  digitInputEmpty: {
    borderColor: '#e5e5e5',
    backgroundColor: '#e5e5e5',
    borderWidth: 1,
    borderRadius: 8,
    height: 70,
    width: 50,
    justifyContent: 'center',
    textAlign: 'center',
  },
  digitTextInput: {
    fontSize: 30,
    textAlign: 'center',
    color: '#34221D',
    marginTop: 9,
  },
  digitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

function ForgotPasswordScreen({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirmPassword, onChangeConfirmPassword] = useState('');
  const [id, onChangeID] = useState('');
  const [code, onChangeCode] = useState('');
  const [bool, setBool] = useState(false);
  const codeDigitsArray = new Array(4).fill(0);
  const ref = useRef(null);

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

  // function that allows users to repress the digits containers to focus
  const handleDigitsPress = () => {
    ref?.current?.focus();
  };

  // function that breaks down the input to digits
  const digitInput = (index) => {
    const digit = code[index] || ' ';

    return (
      <View key={index} style={(digit === ' ') ? styles.digitInputEmpty : styles.digitInput}>
        <Text style={styles.digitTextInput}>{digit}</Text>
      </View>
    );
  };

  const checkValidEmail = () => {
    if (!validateEmail(email)) {
      Alert.alert('Please enter a valid email to proceed');
    } else {
      return true;
    }
    return false;
  };

  // Check account inputs are filled appropriately before moving to next screen
  const checkAccountInputs = () => {
    if (password === '') {
      Alert.alert('Please enter a password to proceed');
    } else if (password.length < 6) {
      Alert.alert('Password must be longer than 5 characters');
    } else if (password !== confirmPassword) {
      Alert.alert('Password confirmation does not match password');
    } else {
      return true;
    }
    return false;
  };

  const handleSendCode = async () => {
    try {
      await axios.patch(`${URL}/passwordReset/create`, { email });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleDeleteCode = async () => {
    try {
      const res = await axios.patch(`${URL}/passwordReset/delete`, { email, passwordResetCode: code });
      onChangeID(res.data.id);
      console.log(id);
      if (id === null) {
        Alert.alert('Incorrect email or code');
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.patch(`${URL}/passwordReset/reset`, { id, password });
    } catch (err) {
      console.error(err);
      return err;
    }
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
          <Text>Please enter the 4-digit code sent to your email address below.</Text>
          <View style={styles.inputContainer}>
            <Pressable style={styles.digitsContainer} onPress={handleDigitsPress}>
              {codeDigitsArray.map((element, index) => digitInput(index))}
            </Pressable>
            <TextInput
              ref={ref}
              value={code}
              onChangeText={onChangeCode}
              keyboardType="number-pad"
              returnKeyType="done"
              textContentType="oneTimeCode"
              maxLength={4}
              style={styles.hiddenCodeInput}
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
                if (handleDeleteCode() === true) {
                  setPage(3);
                }
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
              if (checkAccountInputs()) {
                handleResetPassword();
                navigation.navigate('Sign In');
              }
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
        <Text style={styles.inputLabel}>
          Please enter your email address to receive a verification code.
        </Text>
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
              if (checkValidEmail() && handleSendCode()) {
                setPage(2);
              }
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
