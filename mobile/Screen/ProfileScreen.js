import React, { useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { serviceUpdateUser } from '../redux/services';

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
  const { user: currentUser } = useSelector((state) => state.auth);
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

  const updatedUser = {
    userName: name,
    userEmail: email,
    userSocialPlatform: platform,
    userSocialTag: tag,
  };

  const handleUpdate = () => {
    serviceUpdateUser(updatedUser);
  };

  // Display and edit profile info
  return (
    <View style={styles.container}>
      <View>
        <Text>
          {currentUser.userName}
        </Text>
        <Text>
          {currentUser.userEmail}
        </Text>
        <Text>
          {currentUser.userSocialPlatform}
        </Text>
        <Text>
          {currentUser.userSocialTag}
        </Text>
      </View>
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
        <Picker
          selectedValue={platform}
          style={{ height: 220, width: 150 }}
          onValueChange={(itemValue) => setPlatform(itemValue)}
        >
          <Picker.Item label="Instagram" value="instagram" />
          <Picker.Item label="Twitter" value="twitter" />
          <Picker.Item label="Facebook" value="facebook" />
        </Picker>
        <TextInput
          placeholder="Account Tag"
          onChangeText={onChangeTag}
          value={tag}
        />
      </View>
      <Button title="Clear" onPress={handleClear} />
      <Button title="Save" onPress={handleUpdate} />
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
