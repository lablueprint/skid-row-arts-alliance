/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { URL } from '@env';
import PropTypes from 'prop-types';
import ArtworkCard from '../Components/ArtworkCard';

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
  const { authHeader } = useSelector((state) => state.auth);

  const getAllSubmissions = async () => {
    try {
      setLoadImages(false);
      const res = await axios.get(`${URL}/submissions/get`, {
        headers: authHeader,
      });
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
