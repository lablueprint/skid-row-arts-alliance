/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import PropTypes from 'prop-types';
import ArtworkCard from '../Components/ArtworkCard';

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
    <SafeAreaView>
      {loadImages ? (
        <FlatList
          data={allImageData}
          renderItem={({ item }) => (
            <ArtworkCard
              ImageURL={item.ImageURL}
              id={item.SubmissionData._id}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.SubmissionData._id}
          numColumns={2}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
}

GalleryScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default GalleryScreen;
