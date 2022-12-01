import React, { useEffect, useState } from 'react';
import {
  Button, StyleSheet, Text, View, TextInput,
} from 'react-native';
// import { Picker } from '@react-native-picker/picker';
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

function EventScreen() {
  const [events, setEvents] = useState([]);
  const [reactEvents, setReactEvents] = useState([]);
  const [title, setTitle] = useState();
  const [day, setDay] = useState();
  const [date, setDate] = useState();
  const [recurring, setRecurring] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [specialinstructions, setSpecialInstructions] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [nonprofits, setNonProfits] = useState();
  const [description, setDescription] = useState();
  const [images, setImages] = useState();
  const [tags, setTags] = useState();

  const getEvents = async () => {
    console.log(URL);
    try {
      const result = await axios.get(`${URL}/event/get`);
      setEvents(result.data);
      return result.data;
      // console.log(result.data);
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const removeEvent = async (id) => {
    console.log(URL);
    try {
      const result = await axios.get(`${URL}/event/delete/${id}`);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const createEvent = async () => {
    console.log(URL);
    try {
      const result = await axios.post(`${URL}/event/post`, {
        title,
        date: {
          day,
          date,
          recurring,
        },
        time: {
          startTime,
          endTime,
        },
        location: {
          name,
          address,
          specialinstructions,
          coordinates: {
            latitude,
            longitude,
          },
        },
        nonprofits: [nonprofits],
        description,
        images: [images],
        tags: [tags],
      });
      console.log(result.data);
      setEvents([...events, result.data]);
    } catch (err) {
      console.error(err);
    }
  };

  // initial retrieval of events
  useEffect(() => {
    getEvents();
  }, []);

  // generating React Native
  useEffect(() => {
    setReactEvents(events.map((event) => (
      <View>
        <Text>{event.title}</Text>
        <Button title="deleteEvent" onPress={() => removeEvent(event._id)} />
      </View>
    )));
  }, [events]);

  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
      <Text>Create Event</Text>
      <View>
        <TextInput placeholder="Title" onChangeText={(newTitle) => setTitle(newTitle)} />
        <TextInput placeholder="Day" onChangeText={(newDay) => setDay(newDay)} />
        <TextInput placeholder="Date" onChangeText={(newDate) => setDate(newDate)} />
        <TextInput placeholder="Recurring" onChangeText={(newRecurring) => setRecurring(newRecurring === 'T')} />
        <TextInput placeholder="Start Time" onChangeText={(newStartTime) => setStartTime(newStartTime)} />
        <TextInput placeholder="End Time" onChangeText={(newEndTime) => setEndTime(newEndTime)} />
        <TextInput placeholder="Name" onChangeText={(newName) => setName(newName)} />
        <TextInput placeholder="Address" onChangeText={(newAddress) => setAddress(newAddress)} />
        <TextInput placeholder="Special Instructions" onChangeText={(newInstr) => setSpecialInstructions(newInstr)} />
        <TextInput placeholder="Latitude" onChangeText={(newLat) => setLatitude(newLat)} />
        <TextInput placeholder="Longitude" onChangeText={(newLong) => setLongitude(newLong)} />
        <TextInput placeholder="Non-Profits" onChangeText={(newNPO) => setNonProfits(newNPO)} />
        <TextInput placeholder="Description" onChangeText={(newDescription) => setDescription(newDescription)} />
        <TextInput placeholder="Images" onChangeText={(newImage) => setImages(newImage)} />
        <TextInput placeholder="Tags" onChangeText={(newTag) => setTags(newTag)} />
        {/* <Text>Recurring</Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker> */}
        <Button title="Create Event" onPress={createEvent} />
      </View>
      <Button title="getEvents" onPress={getEvents} />
      <View>
        {reactEvents}
      </View>
    </View>
  );
}

export default EventScreen;
