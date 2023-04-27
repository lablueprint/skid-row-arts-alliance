import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button, ScrollView,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { serviceUpdateUser } from '../redux/services';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
  },
});

function ProfileScreen() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [platform, setPlatform] = useState('');
  const [tag, onChangeTag] = useState('');
  const [loadSavedArt, setLoadSavedArt] = useState(false);
  const [savedArt, setSavedArt] = useState([]);

  const getSavedArtwork = async () => {
    try {
      setLoadSavedArt(false);
      const res = await axios.get(`${URL}/user/getArtwork/63e33e2f578ad1d80bd2a347`);
      setSavedArt(res.data.msg[0].savedArtwork);
      return res;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadSavedArt(true);
    }
  };

  useEffect(() => {
    getSavedArtwork();
  }, []);

  const handleClear = () => {
    serviceUpdateUser({
      userName: '',
      userEmail: '',
      userSocialPlatform: '',
      userSocialTag: '',
    });
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
    <ScrollView style={styles.container}>
      <View style={{
        paddingTop: 30,
        paddingBottom: 50,
      }}
      >
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Name: </Text>
          {currentUser.userName}
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Email: </Text>
          {currentUser.userEmail}
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Social Platform: </Text>
          {currentUser.userSocialPlatform}
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Social Tag: </Text>
          {currentUser.userSocialTag}
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
      <View>
        {
        loadSavedArt ? (
          savedArt.map((oneArt) => (
            <Text>
              {oneArt}
            </Text>
          ))
        ) : <Text>There is no saved art</Text>
      }
      </View>
      <Button title="Save" onPress={handleUpdate} />
      <Button title="Clear" onPress={handleClear} />
    </ScrollView>
  );
}

export default ProfileScreen;
