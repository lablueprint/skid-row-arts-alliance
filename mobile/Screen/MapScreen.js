import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Button,
} from 'react-native';
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { URL } from '@env';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import MapCard from '../Components/MapCard';
import MapMarker from '../Components/MapMarker';

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT + 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
});

// const Images = [
//   { uri: 'http://overcomeandamplify.com/wp-content/uploads/2016/09/broadway-mall.jpg' },
//   { uri: 'https://img.ctykit.com/cdn/ca-dtla/images/tr:w-1800/king-eddy.jpg' },
//   { uri: 'https://images1.apartments.com/i2/KYlRC-2yNZXQSNh0JGMno_S-RIbHbS7bDROWLLtZ1uc/111/star-apartments-los-angeles-ca-primary-photo.jpg' },
//   { uri: 'https://www.lehrerarchitects.com/wp-content/uploads/2017/12/JAMES-WOOD_06-1920x1100.jpg' },
// ];

function MapScreen({ navigation }) {
  const [allEvents, setAllEvents] = useState([]);

  const getAllEvents = async () => {
    try {
      const result = await axios.get(`${URL}/event/get`);
      // const events = result.data;
      setAllEvents(result.data);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const state = {
  //   markers: [
  //     {
  //       id: 1, // TODO: change this temporary id
  //       coordinate: {
  //         latitude: 34.051060,
  //         longitude: -118.247910,
  //       },
  //       title: 'Skid Row History Museum and LA Poverty Department',
  //       description: '250 S Broadway | (213) 413-1077',
  //       image: Images[0],
  //       startDate: new Date('2023-01-27T10:00:00'),
  //       endDate: new Date('2023-01-27T11:00:00'),
  //     },
  //     {
  //       id: 2, // TODO: change this temporary id
  //       coordinate: {
  //         latitude: 34.046070,
  //         longitude: -118.247540,
  //       },
  //       title: 'Open Mic Night with Unkal Bean (King Eddy Saloon)',
  //       description: '131 E 5th St.',
  //       image: Images[1],
  //       startDate: new Date('2023-02-04T17:00:00'),
  //       endDate: new Date('2023-02-04T22:00:00'),
  //     },
  //     {
  //       id: 3, // TODO: change this temporary id
  //       coordinate: {
  //         latitude: 34.043580,
  //         longitude: -118.247680,
  //       },
  //       title: 'Piece by Piece (Star Apartments)',
  //       description: '240 E 6th St. | (323) 963-3372',
  //       image: Images[2],
  //       startDate: new Date('2023-01-28T08:00:00'),
  //       endDate: new Date('2023-01-28T09:00:00'),
  //     },
  //     {
  //       id: 4, // TODO: change this temporary id
  //       coordinate: {
  //         latitude: 34.044536,
  //         longitude: -118.244873,
  //       },
  //       title: 'Movies on the Nickel (James Wood Community Center',
  //       description: '400 E 5th St. | (213) 229-9602',
  //       image: Images[3],
  //       startDate: new Date('2023-01-29T15:00:00'),
  //       endDate: new Date('2023-01-29T16:00:00'),
  //     },
  //   ],
    region: {
      latitude: 34.0442,
      longitude: -118.2439,
      latitudeDelta: 0.005, // smaller value = more zoomed in
      longitudeDelta: 0.005,
    },
  };

  const mapRef = useRef(null);
  mapRef.index = 0;
  mapRef.animation = new Animated.Value(0);

  useEffect(() => {
    mapRef.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= getAllEvents.length) {
        index = getAllEvents.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(mapRef.regionTimeout);
      mapRef.regionTimeout = setTimeout(() => {
        if (mapRef.index !== index) {
          mapRef.index = index;
          const { coordinate } = getAllEvents[index];
          mapRef.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  }, []);

  // const interpolations = allEvents.map((index) => {
  //   const inputRange = [
  //     (index - 1) * CARD_WIDTH,
  //     index * CARD_WIDTH,
  //     (index + 1) * CARD_WIDTH,
  //   ];
  //   const scale = mapRef.animation.interpolate({
  //     inputRange,
  //     outputRange: [1, 2.5, 1],
  //     extrapolate: 'clamp',
  //   });
  //   const opacity = mapRef.animation.interpolate({
  //     inputRange,
  //     outputRange: [0.35, 1, 0.35],
  //     extrapolate: 'clamp',
  //   });
  //   return { scale, opacity };
  // });

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={state.region}
        style={styles.container}
      >
        {/* <MapMarker state={state} interpolations={interpolations} /> */}
      </MapView>
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapRef.animation,
                },
              },
            },
          ],
          { useNativeDriver: true },
        )}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
      >
        {allEvents.map((event) => (
          <MapCard
            // eslint-disable-next-line no-underscore-dangle
            id={event._id}
            image={{ uri: event.images[0] }}
            title={event.title}
            description={event.description}
            startDate={new Date('2023-01-27T10:00:00')} // TODO: don't hardcode
            endDate={new Date('2023-01-27T11:00:00')} // TODO: don't hardcode
          />
        ))}
        <Button
          // BUTTON FOR TESTING ONLY
          title="Return to Sign Up"
          onPress={() => {
            navigation.navigate('Sign Up');
          }}
        // BUTTON FOR TESTING ONLY
        />
      </Animated.ScrollView>
    </View>
  );
}

MapScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default MapScreen;
