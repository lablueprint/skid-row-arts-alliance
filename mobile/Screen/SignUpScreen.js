/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';

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

async function getValueFor(key) {
  // eslint-disable-next-line prefer-const
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log(`🔐 Here's your value 🔐 \n${result}`);
  } else {
    console.log('No values stored under that key.');
  }
}

function SignUpScreen({ navigation }) {
  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [socialPlatform, setSocialPlatform] = useState('');
  const [socialTag, onChangeSocialTag] = React.useState('');

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
          onValueChange={(itemValue, itemIndex) => setSocialPlatform(itemValue)}
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
        title="Save"
        onPress={() => {
          save('name', name);
          save('email', email);
          save('socialTag', socialTag);
          save('socialPlatform', socialPlatform);
          // navigation.navigate('Home');
        }}
      />
      <Button
        title="Get Name"
        onPress={() => {
          getValueFor('name');
        }}
      />
      <Button
        title="Get Email"
        onPress={() => {
          getValueFor('email');
        }}
      />
      <Button
        title="Get Social Platform"
        onPress={() => {
          getValueFor('socialPlatform');
        }}
      />
      <Button
        title="Get Social Tag"
        onPress={() => {
          getValueFor('socialTag');
        }}
      />
    </View>
  );
}

export default SignUpScreen;
