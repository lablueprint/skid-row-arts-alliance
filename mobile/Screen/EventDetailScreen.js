import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Image, Button,
} from 'react-native';
import { URL } from '@env';
import PropTypes from 'prop-types';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 20,
    fontWeight: '30',
  },
  square: {
    width: 40,
    height: 40,
    backgroundColor: '#D9D9D9',
    margin: 40,
  },
  // border: {
  //   borderBottomColor: '#8A8A8A',
  //   borderBottomWidth: '1.5',
  //   marginVertical: 30,
  //   marginBottom: 30,
  //   marginRight: 20,
  //   marginLeft: 20,
  // },
  image: {
    width: 200,
    height: 200,
  },
});

function EventDetailScreen({
  navigation, route,
}) {
  const {
    id, title, organizations, day, location, time, summary, url, number, email, website,
  } = route.params;

  // need to check upon rendering
  // (1) get all events, iterate thro for id

  const [isEventFavorited, setIsEventFavorited] = useState(true);

  const getSomeEvents = async () => {
    try {
      const res = await axios.get(`${URL}/user/getEvents/63e33e2f578ad1d80bd2a347`);
      if ((res.data.msg[0].savedEvents.find((elm) => elm === id.toString())) === undefined) {
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    getSomeEvents().then((status) => setIsEventFavorited(status));
  }, []);

  const addSavedEvent = async (eventId) => {
    try {
      const res = await axios.patch(`${URL}/user/addEvent/63e33e2f578ad1d80bd2a347`, [eventId]);
      setIsEventFavorited(true);
      return res;
    } catch (err) {
      return err;
    }
  };

  const removeSavedEvent = async (eventId) => {
    try {
      const res = await axios.patch(`${URL}/user/removeEvent/63e33e2f578ad1d80bd2a347`, [eventId]);
      setIsEventFavorited(false);
      return res;
    } catch (err) {
      return err;
    }
  };

  const isEventSaved = async () => {
    console.log(isEventFavorited);
  };

  const onPressEvent = () => {
    navigation.navigate('Organization Details', {
      organizations,
      summary,
      number,
      email,
      website,
    });
  };

  // one button toggles between these event handlers
  const onPressFavoriteEvent = () => {
    addSavedEvent(id);
  };

  const onPressUnfavoriteEvent = () => {
    removeSavedEvent(id);
  };

  const onPressIsEvent = () => {
    isEventSaved(id);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>{title}</Text>
      <Text onPress={onPressEvent}>{organizations}</Text>
      <View style={styles.border} />
      <View style={styles.square} />
      <Text>{day}</Text>
      <View style={styles.square} />
      <Text>{time}</Text>
      <View style={styles.square} />
      <Text>{location}</Text>
      <View style={styles.border} />
      <Text style={styles.h2}>Event Description</Text>
      <Text>
        {' '}
        {summary}
        {' '}
      </Text>
      <Text style={styles.h2}>Pictures</Text>
      <Image
        style={styles.image}
        source={{ uri: url }}
      />
      <Button onPress={onPressIsEvent} title="Is the Event Saved HMM"> Favorite Event </Button>
      <Button onPress={onPressFavoriteEvent} title="Favorite Event"> Favorite Event </Button>
      <Button onPress={onPressUnfavoriteEvent} title="Unfavorite Event"> Unfavorite Event </Button>
    </ScrollView>
  );
}

EventDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      organizations: PropTypes.string.isRequired,
      day: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default EventDetailScreen;
