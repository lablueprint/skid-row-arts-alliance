import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, ScrollView, Image, Switch,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

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
    id, title, Encoding, name, description, email,
  } = route.params;

  const [isArtSaved, setIsArtSaved] = useState(false);

  const getSavedArt = async () => {
    try {
      const res = await axios.get(`${URL}/user/getArtwork/63e33e2f578ad1d80bd2a347`);
      if ((res.data.msg[0].savedArtwork.find((elm) => elm === id.toString())) === undefined) {
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    getSavedArt().then((status) => setIsArtSaved(status));
  }, []);

  const addSavedArt = async (artId) => {
    try {
      const res = await axios.patch(`${URL}/user/addArtwork/63e33e2f578ad1d80bd2a347`, [artId]);
      setIsArtSaved(true);
      return res;
    } catch (err) {
      return err;
    }
  };

  const removeSavedArt = async (artId) => {
    try {
      const res = await axios.patch(`${URL}/user/removeArtwork/63e33e2f578ad1d80bd2a347`, [artId]);
      setIsArtSaved(false);
      return res;
    } catch (err) {
      return err;
    }
  };

  const onPressToggleSavedArt = () => {
    if (isArtSaved) {
      removeSavedArt(id);
    } else {
      addSavedArt(id);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
        Title:
        {title}
      </Text>
      <Switch value={isArtSaved} onValueChange={onPressToggleSavedArt} title="Art Save Button" />
      <Text>
        Name:
        {name}
        {'\n'}
        Description:
        {description}
        {'\n'}
        Email:
        {email}
      </Text>
      <Image
        style={{ width: 200, height: 200 }}
        source={{ uri: Encoding }}
      />
    </ScrollView>
  );
}

ArtworkDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      Encoding: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ArtworkDetailScreen;
