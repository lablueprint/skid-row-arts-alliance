/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import ArtworkCard from '../Components/ArtworkCard';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'cnpmenter',
    justifyContent: 'center',
  },
  scrollView: {
    padding: 20,
  },
});

function GalleryScreen({ navigation }) {
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
    <ScrollView style={styles.scrollView}>
      {/* add scrollview here */}
      <Text>Gallery Screen</Text>
      {
        loadImages ? (
          <>
            {
              allImageData.map((imageData) => (
                <ArtworkCard
                  key={imageData.SubmissionData._id}
                  // style={{ width: 50, height: 50 }}
                  Encoding={imageData.Encoding}
                  title={imageData.SubmissionData.title}
                  name={imageData.SubmissionData.name}
                  description={imageData.SubmissionData.description}
                  email={imageData.SubmissionData.email}
                  navigation={navigation}
                />
              ))
            }
          </>
        ) : <Text>Nothing</Text>
      }
    </ScrollView>
  );
}

GalleryScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default GalleryScreen;
