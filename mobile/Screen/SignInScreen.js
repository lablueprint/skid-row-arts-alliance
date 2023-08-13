/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import {
  StyleSheet, Text, TextInput, View, Alert, TouchableOpacity,
} from 'react-native';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { login } from '../redux/sliceAuth';
import SraaLogo from '../Components/SraaLogo';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInContainer: {
    flexDirection: 'column',
    width: '66%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '45%',
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
    fontFamily: 'Montserrat',
  },
  inputContainer: {
    flexDirection: 'column',
    height: '15%',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: '5%',
  },
  button: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '12%',
    backgroundColor: '#4C4C9B',
  },
  link: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat',
  },
  headerText: {
    fontSize: 25,
    paddingBottom: 20,
    fontFamily: 'MontserratMedium',
  },
  inputLabel: {
    fontSize: 15,
    fontFamily: 'Montserrat',
  },
  buttonText: {
    color: '#F8F8F8',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'MontserratBold',
  },
  logo: {
    width: '66%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function SignInScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });

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
      <View style={styles.logo}>
        <SraaLogo width={220} height={220} />
      </View>
      <View style={styles.signInContainer}>
        <Text style={styles.headerText}>Welcome!</Text>
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
        <Text style={styles.inputLabel}>Dont have an account?</Text>
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
