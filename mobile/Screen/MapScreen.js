import React, { useEffect, useState } from 'react';
import {
  Button, StyleSheet, Text, View,
} from 'react-native';
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { URL } from '@env';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function MapScreen() {
  const [events, setEvents] = useState([]);
  const test = async () => {
    console.log(URL);
    try {
      const result = await axios.post(`${URL}/test/post`, {
        name: 'James', age: 20,
      });
      console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getEvents = async () => {
    console.log(URL);
    try {
      const result = await axios.get(`${URL}/event/get`);
      const eventList = result.data.map((event) => (<Text>{event.title}</Text>));
      setEvents(eventList);
      console.log(result.data);
      return eventList;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  useEffect(() => {
    const eventList = getEvents();
    setEvents(eventList);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
      <Button title="Test" onPress={test} />
      {/* <Button title="getEvents" onPress={getEvents} /> */}
      <View>{events.length > 0 ? events : <Text>Nothing</Text>}</View>
    </View>
  );
}

export default MapScreen;
