import React from 'react';
import {
  StyleSheet, ScrollView, StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { URL } from '@env';
import MapEvent from '../Components/MapEvent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    padding: 20,
  },
});

const events = [{
  id: 1,
  title: 'Volunteering',
  date: '10/03/2023',
  location: '3148 Rose Rd,LA',
  nonprofits: 'SRAA',
  description: 'helping artist hang artwork',
},
{
  id: 2,
  title: 'Fundraiser',
  date: '09/08/2023',
  location: '4102 Daisy Rd, LA',
  nonprofits: 'SRAA, Apple',
  description: 'raising money for skid row artists',
},
{
  id: 3,
  title: 'Information Session',
  date: '03/05/2023',
  location: '4123 Blue Rd, LA',
  nonprofits: 'SRAA, Google',
  description: 'information on the skid row artists',
},
];

function MapScreen({ navigation }) {
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

  return (
    <ScrollView style={styles.scrollView}>
      {/* <Text>Map Screen</Text>
      <Button title="Test" onPress={test} /> */}
      {events.map((event) => (
        <MapEvent
          id={event.id}
          title={event.title}
          date={event.date}
          location={event.location}
          nonprofits={event.nonprofits}
          description={event.description}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
}

MapScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default MapScreen;
