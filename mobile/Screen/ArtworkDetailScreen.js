import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, ScrollView, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
  },
  square: {
    width: 40,
    height: 40,
    backgroundColor: '#D9D9D9',
    margin: 40,
  },
});

function ArtworkDetailScreen({
  route,
}) {
  const {
    id,
  } = route.params;
  const [submission, setSubmission] = useState({});
  const [allMediaData, setAllMediaData] = useState([]);
  const [loadImages, setLoadImages] = useState(false);

  const getSubmission = async () => {
    // setLoadImages(false);
    try {
      const res = await axios.get(`${URL}/artgallery/getsubmission`, { params: { id } });
      setSubmission(res.data.Submission);
      setAllMediaData(res.data.MediaData);
      return res.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadImages(true);
    }
  };

  useEffect(() => {
    getSubmission();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
        Title:
        {submission.title}
      </Text>
      <Text>
        Name:
        {submission.name}
        {'\n'}
        Description:
        {submission.description}
        {'\n'}
        Email:
        {submission.email}
      </Text>
      {
        loadImages ? (
          <>
            {
              allMediaData.map((mediaData) => (
                (mediaData.ContentType[0] === 'i')
                  ? (
                    <Image
                      style={{ width: 200, height: 200 }}
                      source={{ uri: mediaData.Encoding }}
                    />
                  ) : <Text>video</Text>
              ))
            }
          </>
        ) : <Text>Nothing</Text>
      }
    </ScrollView>
  );
}

ArtworkDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ArtworkDetailScreen;
