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

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

function SignUpScreen({ navigation }) {
  const [page, setPage] = React.useState(1);

  const [firstName, onChangeFirstName] = React.useState('');
  const [lastName, onChangeLastName] = React.useState('');

  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [confirmPassword, onChangeConfirmPassword] = React.useState('');

  const [bio, onChangeBio] = React.useState('');

  const [socialPlatform, setSocialPlatform] = useState('');
  const [socialTag, onChangeSocialTag] = React.useState('');

  // Check email is proper format
  const validateEmail = (text) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };

  // Check name inputs are filled before moving to next screen
  const checkNameInputs = () => {
    if (firstName === '') {
      Alert.alert('Please enter a first name to proceed');
    } else {
      return true;
    }
    return false;
  };

  // Check account inputs are filled appropriately before moving to next screen
  const checkAccountInputs = () => {
    if (email === '') {
      Alert.alert('Please enter an email to proceed');
    } else if (!validateEmail(email)) {
      Alert.alert('Please enter a valid email to proceed');
    } else if (password === '') {
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

  // Store input and navigate to Home screen
  const handleSignUp = async () => {
    try {
      const userData = {
        userFirstName: firstName,
        userLastName: lastName,
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

  if (page === 1) {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>
            First Name
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeFirstName}
            value={firstName}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>
            Last Name
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeLastName}
            value={lastName}
          />
        </View>
        <Button
          title="Next"
          onPress={() => {
            if (checkNameInputs()) {
              Keyboard.dismiss();
              setPage(2);
            }
          }}
        />
        <Text>Already have an account?</Text>
        <Button
          title="Log in"
          onPress={() => {
            navigation.navigate('Log In');
          }}
        />
      </View>
    );
  }

  if (page === 2) {
    return (
      <View style={styles.container}>
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
            {/* <TextInput
              secureTextEntry
              style={styles.input}
              onChangeText={onChangePassword}
              value={password}
              autoCapitalize={false}
            /> */}
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
            title="Back"
            onPress={() => {
              setPage(1);
            }}
          />
          <Button
            title="Next"
            onPress={() => {
              if (checkAccountInputs()) {
                Keyboard.dismiss();
                setPage(3);
              }
            }}
          />
        </View>
      </View>
    );
  }

  if (page === 3) {
    return (
      <View style={styles.container}>
        <Text>Add a Profile Picture</Text>
        <Button
          title="Back"
          onPress={() => {
            setPage(2);
          }}
        />
        <Button
          title="Skip For Now"
          onPress={() => {
            setPage(4);
          }}
        />

      </View>
    );
  }

  if (page === 4) {
    return (
      <View style={styles.container}>
        <Text>What do you want people to know about you?</Text>
        <Text>Share anything you would like!</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeBio}
          value={bio}
          maxLength={150}
        />
        <Button
          title="Back"
          onPress={() => {
            setPage(3);
          }}
        />
        <Button
          title="Skip For Now"
          onPress={() => {
            setPage(5);
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
        title="Back"
        onPress={() => {
          setPage(1);
        }}
      />
      <Button
        title="Sign Up"
        onPress={() => {
          save('firstName', firstName);
          save('lastName', lastName);
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

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default SignUpScreen;

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
