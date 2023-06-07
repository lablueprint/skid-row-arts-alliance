import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, Dimensions, Image,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import { Card } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const cardGap = 17;

const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;

const styles = StyleSheet.create({
  savedCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  savedResourceCard: {
    marginTop: cardGap,
    width: cardWidth,
    borderRadius: 15,
    borderColor: '#CD7F3D',
    borderLeftWidth: 15,
    borderWidth: 1,
    marginLeft: 10,
  },
  savedTitle: {
    fontSize: 16,
    color: '#1E2021',
  },
  savedCategoryTitle: {
    fontSize: 14,
    color: '#1E2021',
    paddingBottom: 5,
  },
});

function SavedArtworkScreen() {
  const [loadAllThumnails, setLoadAllThumbnails] = useState(false);
  const [allThumbnails, setAllThumbnails] = useState([]);
  const [loadSavedArt, setLoadSavedArt] = useState(false);
  const [savedArt, setSavedArt] = useState([]);

  const { id, authHeader } = useSelector((state) => state.auth);

  const findThumbnail = (artID) => {
    const artInfo = {
      thumbNail: 'No Tag',
    };
    if (loadAllThumnails) {
      allThumbnails.forEach((thumbnail) => {
        if (thumbnail.SubmissionId === artID) {
          artInfo.thumbNail = (thumbnail.ImageURL);
        }
      });
    }
    return artInfo.thumbNail;
  };

  const getSavedArtwork = async () => {
    try {
      setLoadSavedArt(false);
      const res = await axios.get(`${URL}/user/getArtwork/${id}`, {
        headers: authHeader,
      });
      setSavedArt(res.data.msg[0].savedArtwork.slice(0, 2));
      return res;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadSavedArt(true);
    }
  };

  const getThumbnails = async () => {
    try {
      setLoadAllThumbnails(false);
      const result = await axios.get(`${URL}/submissions/getthumbnails`, {
        headers: authHeader,
      });
      setAllThumbnails(result.data);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadAllThumbnails(true);
    }
  };

  useEffect(() => {
    getSavedArtwork();
    getThumbnails();
  }, []);

  // Display and edit profile info
  return (
    <ScrollView>
      <View style={styles.savedCardContainer}>
        {
        loadSavedArt ? (
          savedArt.map((oneArt) => (
            <Card>
              <Card.Content style={styles.savedArtCard}>
                <Image // works with card.cover as well
                  style={{ height: 250, width: 250 }}
                  source={{ uri: findThumbnail(oneArt) }}
                />
              </Card.Content>
            </Card>
          ))
        ) : <Text>There is no saved art</Text>
      }
      </View>
    </ScrollView>
  );
}

SavedArtworkScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default SavedArtworkScreen;
