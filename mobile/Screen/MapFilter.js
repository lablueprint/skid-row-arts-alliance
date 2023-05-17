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
  text: {
    fontSize: 16,
    color: 'grey',
  },
  header: {
    color: 'grey',
    fontSize: 16,
    marginTop: 25,
    marginBottom: 10,
    fontWeight: 'bold',
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
      length: 10,
    },
    {
      title: 'film',
      key: 'film',
      length: 4,
    },
    {
      title: 'music',
      key: 'music',
      length: 5,
    },
    {
      title: 'art-related community event',
      key: 'artRelatedCommunityEvent',
      length: '27',
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
      length: '4',
    },
    {
      title: 'shelter',
      key: 'shelter',
      length: 7,
    },
    {
      title: 'health',
      key: 'health',
      length: 6,
    },
    {
      title: 'legal services',
      key: 'legalServices',
      length: 14,
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

  const getButtonColor = (category) => {
    if (category) {
      return '#DFDFEF';
    }
    return '#F8F8F8';
  };

  const getBorderColor = (category) => {
    if (category) {
      return '#4C4C9B';
    } return '#D0D0E8';
  };

  const getButtonStyle = (category) => ({
    width: '40%',
    height: 45,
    backgroundColor: getButtonColor(category),
    borderWidth: 2,
    borderRadius: 10,
    borderColor: getBorderColor(category),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
  });

  const getTextColor = (category) => {
    if (category) {
      return '#424288';
    } return '#6666A9';
  };

  const getTextStyle = (category) => ({
    color: getTextColor(category),
    fontSize: 16,
  });

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
      <Text style={styles.text}>Select Multiple Filtering Options.</Text>
      <Text style={styles.header}>Events</Text>
      <View style={styles.container}>
        {eventCategories.map((category) => (
          <TouchableOpacity
            style={getButtonStyle(tempCategories[category.key])}
            onPress={() => onPressCategories(category.key)}
          >
            <Text style={getTextStyle(tempCategories[category.key])}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.header}>Resources</Text>
      <View style={styles.container}>
        {resourceCategories.map((category) => (
          <TouchableOpacity
            style={getButtonStyle(tempCategories[category.key])}
            onPress={() => onPressCategories(category.key)}
          >
            <Text style={getTextStyle(tempCategories[category.key])}>{category.title}</Text>
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
