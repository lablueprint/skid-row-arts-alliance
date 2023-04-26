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

function CreateNewPassword({ navigation }) {
  const [password, onChangePassword] = React.useState('');
  const [confirmPassword, onChangeConfirmPassword] = React.useState('');

  const checkPasswordInputs = () => {
    if (password === '') {
      Alert.alert('Please enter a password to proceed');
    } else if (password.length < 6) {
      Alert.alert('Password must be longer than 5 characters');
    } else if (password !== confirmPassword) {
      Alert.alert('Password Confirmation does not match Password');
    } else {
      return true;
    }
    return false;
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          New Password
        </Text>
        <DotTextInput value={password} onChangeText={onChangePassword} />
        <Text>6 or more characters</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
      <Button
        title="Save"
        onPress={() => {
          if (checkPasswordInputs()) {
            Keyboard.dismiss();
            Alert.alert('Password changed successfully');
          }
        }}
      />
    </View>
  );
}

export default CreateNewPassword;
