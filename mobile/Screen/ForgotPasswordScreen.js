import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import {
  StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity, Dimensions,
} from 'react-native';
import { login } from '../redux/sliceAuth';
import DotTextInput from '../Components/DotTextInput';

function ForgotPasswordScreen({ navigation }) {
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
