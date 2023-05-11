import React, { useState } from 'react';
import {
  View, TouchableOpacity, ScrollView, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

// TO DO: when you press apply, it navigates back to map screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-direction',
    paddingHorizontal: 20,
  },
  button: {
    width: '40%',
    height: 45,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#C0C0DC',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
  },
  title: {
    color: '#6666A9',
    fontSize: 16,
  },
});

function MapFilter({ route, navigation }) {
  const {
    categories, setCategories,
  } = route.params;

  const eventCategories = [
    {
      title: 'visual art',
      key: 'visualArt',
    },
    {
      title: 'film',
      key: 'film',
    },
    {
      title: 'music',
      key: 'music',
    },
    {
      title: 'art-related community event',
      key: 'artRelatedCommunityEvent',
    },
    {
      title: 'performance/theater',
      key: 'performance/theater',
    },
    {
      title: 'spoken word',
      key: 'spokenWord',
    },
    {
      title: 'miscellaneous',
      key: 'miscellaneous',
    },
  ];

  const resourceCategories = [
    {
      title: 'food',
      key: 'food',
    },
    {
      title: 'shelter',
      key: 'shelter',
    },
    {
      title: 'health',
      key: 'health',
    },
    {
      title: 'legal services',
      key: 'legalServices',
    },
    {
      title: 'shower',
      key: 'shower',
    },
    {
      title: 'mission',
      key: 'mission',
    },
    {
      title: 'social services',
      key: 'socialServices',
    },

  ];

  // MAKE THIS USE_EFFECT
  const [tempCategories, setTempCategories] = useState({ ...categories });

  // update the true/false categories
  const onPressCategories = (property) => {
    const objectCopy = { ...tempCategories };
    objectCopy[property] = !objectCopy[property];
    setTempCategories(objectCopy);
  };

  // TO DO: clear temp categories and categories
  const onPressClear = () => {
    const objectCopy = { ...tempCategories };
    for (let i = 0; i < eventCategories.length; i += 1) {
      const property = eventCategories[i].key;
      objectCopy[property] = false;
    }

    for (let i = 0; i < resourceCategories.length; i += 1) {
      const property = resourceCategories[i].key;
      objectCopy[property] = false;
    }
    setTempCategories(objectCopy);
    setCategories(objectCopy);
  };

  // // call filter only when apply is implemented
  const onPressApply = () => {
    setCategories(tempCategories);
    navigation.goBack();
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Select Multiple Filtering Options.</Text>
      <Text style={styles.title}>Events</Text>
      <View style={styles.container}>
        {eventCategories.map((category) => (
          <TouchableOpacity style={styles.button} onPress={() => onPressCategories(category.key)}>
            <Text style={styles.title}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.title}>Resources</Text>
      <View style={styles.container}>
        {resourceCategories.map((category) => (
          <TouchableOpacity style={styles.button} onPress={() => onPressCategories(category.key)}>
            <Text style={styles.title}>{category.title}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.button, { borderRadius: 4 }, { borderColor: '#424288' }]} title="clear" onPress={() => onPressClear()}>
          <Text style={[styles.title, { color: '#424288' }, { fontWeight: '600' }]}>
            Clear All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { borderRadius: 4 }, { backgroundColor: '#424288' }, { borderColor: '#424288' }]} title="apply" onPress={() => onPressApply()}>
          <Text style={[styles.title, { color: 'white' }, { fontWeight: '600' }]}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

MapFilter.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      categories: PropTypes.shape.isRequired,
      setCategories: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default MapFilter;
