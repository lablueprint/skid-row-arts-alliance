import React, { useState } from 'react';
import {
  View, TouchableOpacity, ScrollView, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
    color: 'grey',
  },
  header: {
    color: 'dimgrey',
    fontSize: 16,
    marginTop: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  applyButton: {
    marginTop: 20,
    marginBottom: 50,
    width: '95%',
    borderRadius: 4,
    height: 45,
    backgroundColor: '#424288',
    borderWidth: 2,
    borderColor: '#424288',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
  },
});

function MapFilter({ route, navigation }) {
  const {
    categories, setCategories,
  } = route.params;

  const eventCategories = [
    {
      title: 'visual art',
      length: 10,
    },
    {
      title: 'film',
      length: 4,
    },
    {
      title: 'music',
      length: 5,
    },
    {
      title: 'art-related community event',
      length: 27,
    },
    {
      title: 'performance/theater',
      length: 19,
    },
    {
      title: 'spoken word',
      length: 11,
    },
    {
      title: 'miscellaneous',
      length: 14,
    },
  ];

  const resourceCategories = [
    {
      title: 'food',
      length: 4,
    },
    {
      title: 'shelter',
      length: 7,
    },
    {
      title: 'health',
      length: 6,
    },
    {
      title: 'legal services',
      length: 14,
    },
    {
      title: 'shower',
      length: 6,
    },
    {
      title: 'mission',
      length: 7,
    },
    {
      title: 'social services',
      length: 15,
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

  const getButtonStyle = (object, category) => ({
    width: ((object.length) + 5) * 9,
    height: 50,
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

  const onPressCategories = (property) => {
    const objectCopy = { ...tempCategories };
    objectCopy[property] = !objectCopy[property];
    setTempCategories(objectCopy);
  };

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
            style={getButtonStyle(category, tempCategories[category.title])}
            onPress={() => onPressCategories(category.title)}
          >
            <Text style={getTextStyle(tempCategories[category.title])}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.header}>Resources</Text>
      <View style={styles.container}>
        {resourceCategories.map((category) => (
          <TouchableOpacity
            style={getButtonStyle(category, tempCategories[category.title])}
            onPress={() => onPressCategories(category.title)}
          >
            <Text style={getTextStyle(tempCategories[category.title])}>{category.title}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.applyButton} title="apply" onPress={() => onPressApply()}>
          <Text style={[styles.title, { color: 'white' }, { fontWeight: '600' }]}>
            Apply Filter
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

MapFilter.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      categories: PropTypes.func.isRequired,
      setCategories: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default MapFilter;
