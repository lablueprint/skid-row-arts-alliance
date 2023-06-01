import React, { useState } from 'react';
import {
  Image, View, TouchableOpacity, ScrollView, Text, StyleSheet,
} from 'react-native';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  bigContainer: {
    padding: 23,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    marginRight: 10,
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: '#5B6772',
  },
  header: {
    fontFamily: 'MontserratSemiBold',
    color: '#5B6772',
    fontSize: 16,
    marginTop: 24,
    marginBottom: 15,
  },
  applyButton: {
    width: '50%',
    borderRadius: 4,
    height: 45,
    backgroundColor: '#424288',
    borderWidth: 1,
    borderColor: '#424288',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    width: '40%',
    borderRadius: 4,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#424288',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  bottomButtons: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 16,
  },
});

function MapFilter({ route, navigation }) {
  const {
    categories, setCategories,
  } = route.params;

  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });

  const eventCategories = [
    {
      title: 'visual art',
    },
    {
      title: 'film',
    },
    {
      title: 'music',
    },
    {
      title: 'art-related community event',
    },
    {
      title: 'performance / theater',
    },
    {
      title: 'spoken word',
    },
    {
      title: 'miscellaneous',
    },
  ];

  const resourceCategories = [
    {
      title: 'food',
      image: require('../assets/map/food.png'),
    },
    {
      title: 'shelter',
      image: require('../assets/map/shelter.png'),
    },
    {
      title: 'health',
      image: require('../assets/map/health.png'),
    },
    {
      title: 'legal services',
      image: require('../assets/map/legal_services.png'),
    },
    {
      title: 'shower',
      image: require('../assets/map/shower.png'),
    },
    {
      title: 'mission',
      image: require('../assets/map/mission.png'),
    },
    {
      title: 'social services',
      image: require('../assets/map/social_services.png'),
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
    height: 50,
    backgroundColor: getButtonColor(category),
    borderWidth: 2,
    borderRadius: 9,
    borderColor: getBorderColor(category),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 17,
    flexDirection: 'row',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 8.5,
    paddingBottom: 8.5,
  });

  const getTextColor = (category) => {
    if (category) {
      return '#424288';
    } return '#6666A9';
  };

  const getTextStyle = (category) => ({
    fontFamily: 'MontserratMedium',
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

  const onPressClear = () => {
    const objectCopy = { ...tempCategories };
    for (let i = 0; i < eventCategories.length; i += 1) {
      const property = eventCategories[i].title;
      objectCopy[property] = false;
    }
    for (let i = 0; i < resourceCategories.length; i += 1) {
      const property = resourceCategories[i].title;
      objectCopy[property] = false;
    }
    setTempCategories(objectCopy);
  };

  return (
    <ScrollView contentContainerStyle={styles.bigContainer}>
      <Text style={styles.text}>Select Multiple Filtering Options.</Text>
      <Text style={styles.header}>Events</Text>
      <View style={styles.container}>
        {eventCategories.map((category) => (
          <TouchableOpacity
            style={getButtonStyle(tempCategories[category.title])}
            onPress={() => onPressCategories(category.title)}
          >
            <Text style={getTextStyle(tempCategories[category.title])}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[styles.header, { marginTop: 10 }]}>Resources</Text>
      <View style={styles.container}>
        {resourceCategories.map((category) => (
          <TouchableOpacity
            style={getButtonStyle(tempCategories[category.title])}
            onPress={() => onPressCategories(category.title)}
          >
            <Image
              source={category.image}
              style={styles.image}
            />
            <Text style={getTextStyle(tempCategories[category.title])}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.container, { marginTop: 35 }]}>
        <TouchableOpacity style={styles.clearButton} title="apply" onPress={() => onPressClear()}>
          <Text style={[styles.bottomButtons, { color: '#424288'}]}>
            Clear All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} title="apply" onPress={() => onPressApply()}>
          <Text style={[styles.bottomButtons, { color: '#FFFFFF'}]}>
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
      categories: PropTypes.func.isRequired,
      setCategories: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default MapFilter;
