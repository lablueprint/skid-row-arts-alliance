/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import PropTypes from 'prop-types';
import ArtworkCard from '../Components/ArtworkCard';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 35,
    paddingBottom: 10,
  },
  headerText: {
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
    try {
      setLoadImages(false);
      const res = await axios.get(`${URL}/submissions/get`);
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
      <Text>Gallery Screen</Text>
      {
        loadImages ? (
          <>
            {
              allImageData.map((imageData) => (
                <ArtworkCard
                  ImageURL={imageData.ImageURL}
                  id={imageData.SubmissionData._id}
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
