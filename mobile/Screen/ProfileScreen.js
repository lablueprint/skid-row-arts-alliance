import React, { useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/sliceAuth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
  },
});

function ProfileScreen() {
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [platform, setPlatform] = useState('');
  const [tag, onChangeTag] = useState('');
  const dispatch = useDispatch();

  const handleClear = () => {
    // serviceUpdateUser({
    //   userName: '',
    //   userEmail: '',
    //   userSocialPlatform: '',
    //   userSocialTag: '',
    // });
  };

  // const updatedUser = {
  //   userName: name,
  //   userEmail: email,
  //   userSocialPlatform: platform,
  //   userSocialTag: tag,
  // };

  const handleUpdate = () => {
    // serviceUpdateUser(updatedUser);
  };

  // Store input and navigate to Home screen
  const handleSignOut = async () => {
    dispatch(logout());
  };

  // Display and edit profile info
  return (
    <View style={styles.container}>
      <View style={{
        paddingTop: 30,
        paddingBottom: 50,
      }}
      >
        <Button
          title="Sign Out"
          onPress={() => {
            handleSignOut();
          }}
        />
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Name: </Text>
          currentUser.userName
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Email: </Text>
          currentUser.userEmail
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Social Platform: </Text>
          currentUser.userSocialPlatform
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Social Tag: </Text>
          currentUser.userSocialTag
        </Text>
      </View>
      <View style={{ paddingBottom: 40 }}>
        <Text style={{ fontWeight: '800', fontSize: 25, paddingBottom: 10 }}>
          Edit Profile Fields
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ paddingRight: 10 }}>
            Name:
          </Text>
          <TextInput
            placeholder="Name"
            onChangeText={onChangeName}
            value={name}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ paddingRight: 10 }}>
            Email:
          </Text>
          <TextInput
            placeholder="Email"
            onChangeText={onChangeEmail}
            value={email}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>
            Social Platform:
          </Text>
          <Picker
            selectedValue={platform}
            style={{ height: 200, width: 150 }}
            onValueChange={(itemValue) => setPlatform(itemValue)}
          >
            <Picker.Item label="Instagram" value="instagram" />
            <Picker.Item label="Twitter" value="twitter" />
            <Picker.Item label="Facebook" value="facebook" />
          </Picker>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ paddingRight: 10 }}>
            Social Tag:
          </Text>
          <TextInput
            placeholder="Account Tag"
            onChangeText={onChangeTag}
            value={tag}
          />
        </View>
      </View>
      <Button title="Save" onPress={handleUpdate} />
      <Button title="Clear" onPress={handleClear} />
    </View>
  );
}

export default ProfileScreen;
