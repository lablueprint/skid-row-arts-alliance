import React, { useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
    // alignItems: "center",
    // justifyContent: "center",
  },
});

function ProfileScreen() {
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [platform, setPlatform] = useState('');
  const [tag, onChangeTag] = useState('');
  const [profileDetails, setProfileDetails] = useState({}); // on hit clear, store fields in object

  const handleClear = () => {
    setProfileDetails({
      name,
      email,
      platform,
      tag,
    });
    onChangeName('');
    onChangeEmail('');
    onChangeTag('');
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          onChangeText={onChangeName}
          value={name}
        />
        <TextInput
          placeholder="Email"
          onChangeText={onChangeEmail}
          value={email}
        />
        {/* <Picker
          selectedValue={platform}
          onValueChange={(currentPlatform) => setPlatform(currentPlatform)}
        >
          <Picker.Item label="Facebook" value="Facebook" />
          <Picker.Item label="Instagram" value="Instagram" />
          <Picker.Item label="Twitter" value="Twitter" />
        </Picker> */}
        <TextInput
          placeholder="Account Tag"
          onChangeText={onChangeTag}
          value={tag}
        />
      </View>
      <Button title="Clear" onPress={handleClear} />
      <Text>
        {profileDetails.name}
        {'\n'}
        {profileDetails.email}
        {'\n'}
        {profileDetails.platform}
        {'\n'}
        {profileDetails.tag}
      </Text>
    </View>
  );
}

export default ProfileScreen;
