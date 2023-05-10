import React, { useState } from 'react';
import {
  View, TouchableOpacity, ScrollView, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
// import axios from 'axios';
// import { URL } from '@env';

/* TO DO: pull data from back-end, the reason it is not rendering right now is prolly because
in MapScreen when you render MapCard it has MapCard and does resource.ResourceData
TO DO: when you press apply, it closes the new tab. when i repull from the database */

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

function MapFilter({ route }) {
  const {
    categories, setCategories,
  } = route.params;

  const eventCategories = [
    {
      title: 'Visual Art',
      key: 'visualArt',
    },
    {
      title: 'Film',
      key: 'film',
    },
    {
      title: 'Music',
      key: 'music',
    },
    {
      title: 'Miscellaneous',
      key: 'miscellaneous',
    },
  ];

  const resourceCategories = [
    {
      title: 'Food',
      key: 'food',
    },
    {
      title: 'Shelter',
      key: 'shelter',
    },
    {
      title: 'Mission',
      key: 'mission',
    },
    {
      title: 'Legal Services',
      key: 'legalServices',
    },
    {
      title: 'Social Services',
      key: 'socialServices',
    },
    {
      title: 'Shower',
      key: 'shower',
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
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Workshops</Text>
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
};

export default MapFilter;
