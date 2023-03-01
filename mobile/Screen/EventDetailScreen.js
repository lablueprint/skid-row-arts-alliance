import React from 'react';
import {
  StyleSheet, View, Text, ScrollView, Image,
} from 'react-native';
import PropTypes from 'prop-types';

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
  border: {
    borderBottomColor: '#8A8A8A',
    borderBottomWidth: '1.5',
    marginVertical: 30,
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

function EventDetailScreen({
  navigation, route,
}) {
  const {
    title, organizations, day, location, time, summary, url, number, email, website,
  } = route.params;

  const onPressEvent = () => {
    navigation.navigate('Organization Details', {
      organizations,
      summary,
      number,
      email,
      website,
    });
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
    </ScrollView>
  );
}

EventDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
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
