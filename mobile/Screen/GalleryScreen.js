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
  const [allImageData, setAllImageData] = useState([]);
  const [loadImages, setLoadImages] = useState(false);

  const getAllSubmissions = async () => {
    // setLoadImages(false);
    try {
      const res = await axios.get(`${URL}/artgallery/get`);
      setAllImageData(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadImages(true);
    }
  };

  useEffect(() => {
    getAllSubmissions();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Gallery Screen</Text>
      {
        loadImages ? (
          <>
            {
              allImageData.map((imageData) => (
                <>
                  <Image
                    key={imageData.SubmissionData._id}
                    style={{ width: 100, height: 100 }}
                    source={{ uri: imageData.Encoding }}
                  />
                  <Text>{imageData.SubmissionData.name}</Text>
                </>
              ))
            }
          </>
        ) : <Text>Nothing</Text>
      }
    </View>
  );
}

export default GalleryScreen;
