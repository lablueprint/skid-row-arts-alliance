import React, { useState, useEffect } from 'react';
import { URL } from '@env';
import axios from 'axios';
import {
  StyleSheet, Text, TextInput, View, Button, Image, ScrollView, ImageBackground,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    borderWidth: 1,
    maxWidth: '38%',
    maxHeight: '100%',
  },
  rightColumn: {
    flex: 1,
    borderWidth: 1,
    maxHeight: '48%', // changes row size
  },
  row: {
    flex: 1,
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: '6%',
  },
  avatar: {
    height: '51.5%',
    width: '80%',
    marginLeft: 26,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#000000',
  },
  socialMediaLogo: {
    // width: '25%',
    // height: '100%',
    width: '9%',
    height: '5%',
    marginRight: 10,
    overflow: 'visible',
    alignSelf: 'center',
  },
});

function OutwardProfileScreen() {
  const [user, setUser] = useState({});

  const getUserData = async () => {
    try {
      const res = await axios.get(`${URL}/user/getUser/6458b293755a8dbbf4d9a6a9`);
      setUser(res.data.msg);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  console.log(1, user);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View>
      <Text>{user.firstName} {user.lastName}</Text>
      <Text>hi</Text>
      <View style={styles.container}>
        <View style={styles.column}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1454769/pexels-photo-1454769.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
            resizeMode="cover"
            style={styles.avatar}
          />
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.row}>
            <View style={{ flex: 0, flexDirection: 'row' }}>
              <Image
                source={require('../assets/facebook-icon.png')}
                style={styles.socialMediaLogo}
              />
              <Text style={{ marginTop: 0, }}>Juliet Zhang</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 0, flexDirection: 'row' }}>
              <Image
                source={require('../assets/facebook-icon.png')}
                style={styles.socialMediaLogo}
              />
              <Text>@juliet_zha</Text>
            </View>
          </View>
          <View style={styles.row}>
          <View style={{ flex: 0, flexDirection: 'row' }}>
            <Image
              source={require('../assets/facebook-icon.png')}
              style={styles.socialMediaLogo}
            />
            <Text>@juliet_zha</Text>
          </View>
          </View>
        </View>
      </View>
      <Text>{user.bio}</Text>
    </View>
  );
}

export default OutwardProfileScreen;
