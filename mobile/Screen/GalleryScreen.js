import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { URL } from '@env';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'cnpmenter',
    justifyContent: 'center',
  },
});

function GalleryScreen() {
  const [imageURI, setImageURI] = useState('');

  const getImage = async () => {
    console.log(URL);
    try {
      console.log('hello');
      const result = await axios.get(`${URL}/artgallery/get`);
      setImageURI(result.data);
      console.log(result);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Gallery Screen</Text>
      <Image
        source={{
          uri: imageURI,
        }}
      />
    </View>
  );
}

export default GalleryScreen;
