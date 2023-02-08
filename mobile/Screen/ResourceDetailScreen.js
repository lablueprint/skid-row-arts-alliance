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
  },
  image: {
    width: 200,
    height: 200,
  },
});

function ResourceDetailScreen({
  route,
}) {
  const {
    title, date, day, location, time, summary, url,
  } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>{title}</Text>
      <Text>{date}</Text>
      <Text>{location}</Text>
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

ResourceDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      day: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ResourceDetailScreen;
