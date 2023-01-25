/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import PropTypes from 'prop-types';
import { serviceLogin } from '../redux/services';

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

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

function SignUpScreen({ navigation }) {
  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [socialPlatform, setSocialPlatform] = useState('');
  const [socialTag, onChangeSocialTag] = React.useState('');

  // Store input and navigate to Home screen
  const handleSignUp = async () => {
    try {
      const userData = {
        userName: name,
        userEmail: email,
        userSocialPlatform: socialPlatform,
        userSocialTag: socialTag,
      };
      serviceLogin(userData);
      navigation.navigate('Home');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Email
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Social Media Platform
        </Text>
        <Picker
          selectedValue={socialPlatform}
          style={{ height: 220, width: 150 }}
          onValueChange={(itemValue) => setSocialPlatform(itemValue)}
        >
          <Picker.Item label="Instagram" value="instagram" />
          <Picker.Item label="Twitter" value="twitter" />
          <Picker.Item label="Facebook" value="facebook" />
        </Picker>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Social Media Tag
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSocialTag}
          value={socialTag}
        />
      </View>
      <Button
        title="Sign Up"
        onPress={() => {
          save('name', name);
          save('email', email);
          save('socialTag', socialTag);
          save('socialPlatform', socialPlatform);
          handleSignUp();
        }}
      />
      <Button
        title="Go to Map"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
}

export default SignUpScreen;

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
