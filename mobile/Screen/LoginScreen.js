/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button, Alert, Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import PropTypes from 'prop-types';
import { serviceLogin } from '../redux/services';
import DotTextInput from '../Components/DotTextInput';

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

function LoginScreen({ navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

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
          autoCapitalize={false}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Password
        </Text>
        <DotTextInput value={password} onChangeText={onChangePassword} />
      </View>
      <Button
        title="Log In"
        onPress={() => {
          if (checkValidEmail()) {
            Keyboard.dismiss();
            navigation.navigate('Home');
          }
        }}
      />
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

export default LoginScreen;

LoginScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
