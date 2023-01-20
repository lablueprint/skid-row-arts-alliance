/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import axios from 'axios';
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
  const [imageURIs, setImageURIs] = useState([]);
  const [loadImages, setLoadImages] = useState(false);

  const getImage = async () => {
    setLoadImages(false);
    try {
      const res = await axios.get(`${URL}/artgallery/get`);
      setImageURIs(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadImages(true);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Gallery Screen</Text>
      {
        loadImages ? (
          <>
            {
              imageURIs.map((imageURI) => (
                <Image
                  key={imageURI.SubmissionData._id}
                  style={{ width: 100, height: 100 }}
                  source={{ uri: imageURI.Encoding }}
                />
              ))
            }
          </>
        ) : <Text>Nothing</Text>
      }
    </View>
  );
}

export default GalleryScreen;
