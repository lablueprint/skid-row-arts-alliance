import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import MapView from 'react-native-maps';
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

const Images = [
  { uri: 'http://overcomeandamplify.com/wp-content/uploads/2016/09/broadway-mall.jpg' },
  { uri: 'https://img.ctykit.com/cdn/ca-dtla/images/tr:w-1800/king-eddy.jpg' },
  { uri: 'https://images1.apartments.com/i2/KYlRC-2yNZXQSNh0JGMno_S-RIbHbS7bDROWLLtZ1uc/111/star-apartments-los-angeles-ca-primary-photo.jpg' },
  { uri: 'https://www.lehrerarchitects.com/wp-content/uploads/2017/12/JAMES-WOOD_06-1920x1100.jpg' },
];

function MapScreen() {
  const state = {
    markers: [
      {
        id: 1, // TODO: change this temporary id
        coordinate: {
          latitude: 34.051060,
          longitude: -118.247910,
        },
        title: 'Skid Row History Museum and LA Poverty Department',
        description: '250 S Broadway | (213) 413-1077',
        image: Images[0],
        startDate: new Date('2023-01-27T10:00:00'),
        endDate: new Date('2023-01-27T11:00:00'),
      },
      {
        id: 2, // TODO: change this temporary id
        coordinate: {
          latitude: 34.046070,
          longitude: -118.247540,
        },
        title: 'Open Mic Night with Unkal Bean (King Eddy Saloon)',
        description: '131 E 5th St.',
        image: Images[1],
        startDate: new Date('2023-02-04T17:00:00'),
        endDate: new Date('2023-02-04T22:00:00'),
      },
      {
        id: 3, // TODO: change this temporary id
        coordinate: {
          latitude: 34.043580,
          longitude: -118.247680,
        },
        title: 'Piece by Piece (Star Apartments)',
        description: '240 E 6th St. | (323) 963-3372',
        image: Images[2],
        startDate: new Date('2023-01-28T08:00:00'),
        endDate: new Date('2023-01-28T09:00:00'),
      },
      {
        id: 4, // TODO: change this temporary id
        coordinate: {
          latitude: 34.044536,
          longitude: -118.244873,
        },
        title: 'Movies on the Nickel (James Wood Community Center',
        description: '400 E 5th St. | (213) 229-9602',
        image: Images[3],
        startDate: new Date('2023-01-29T15:00:00'),
        endDate: new Date('2023-01-29T16:00:00'),
      },
    ],
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
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(mapRef.regionTimeout);
      mapRef.regionTimeout = setTimeout(() => {
        if (mapRef.index !== index) {
          mapRef.index = index;
          const { coordinate } = state.markers[index];
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

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];
    const scale = mapRef.animation.interpolate({
      inputRange,
      outputRange: [1, 2.5, 1],
      extrapolate: 'clamp',
    });
    const opacity = mapRef.animation.interpolate({
      inputRange,
      outputRange: [0.35, 1, 0.35],
      extrapolate: 'clamp',
    });
    return { scale, opacity };
  });

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={state.region}
        style={styles.container}
      >
        <MapMarker state={state} interpolations={interpolations} />
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
        {state.markers.map((marker) => (
          <MapCard
            id={marker.id} // TODO: change this temporary id
            image={marker.image}
            title={marker.title}
            description={marker.description}
            startDate={marker.startDate}
            endDate={marker.endDate}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

export default MapScreen;
