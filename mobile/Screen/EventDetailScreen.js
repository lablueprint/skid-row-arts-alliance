import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Image, Switch,
} from 'react-native';
import { useSelector } from 'react-redux';
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
  image: {
    width: 200,
    height: 200,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function EventDetailScreen({
  navigation, route,
}) {
  const {
    eventId, title, organizations, day, location, time, summary, url, number, email, website,
  } = route.params;

  const [isEventSaved, setIsEventSaved] = useState(false);
  const { id, authHeader } = useSelector((state) => state.auth);

  const getSavedEvents = async () => {
    try {
      const res = await axios.get(`${URL}/user/getEvents/${id}`, {
        headers: authHeader,
      });
      if ((res.data.msg[0].savedEvents.find((elem) => elem === eventId.toString())) === undefined) {
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    getSavedEvents().then((status) => setIsEventSaved(status));
  }, []);

  const addSavedEvent = async () => {
    try {
      const res = await axios.patch(`${URL}/user/addEvent/${id}`, [eventId], {
        headers: authHeader,
      });
      setIsEventSaved(true);
      return res;
    } catch (err) {
      return err;
    }
  };

  const removeSavedEvent = async () => {
    try {
      const res = await axios.patch(`${URL}/user/removeEvent/${id}`, [eventId], {
        headers: authHeader,
      });
      setIsEventSaved(false);
      return res;
    } catch (err) {
      return err;
    }
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

  const onPressToggleSavedEvent = () => {
    if (isEventSaved) {
      removeSavedEvent();
    } else {
      addSavedEvent();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.h1}>{title}</Text>
        <Switch value={isEventSaved} onValueChange={onPressToggleSavedEvent} title="Event Save Button" />
      </View>
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
    </ScrollView>
  );
}

EventDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      eventId: PropTypes.number.isRequired,
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
