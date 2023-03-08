import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Button,
} from 'react-native';
import axios from 'axios';
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
    flexDirection: 'row',
    justifyContent: 'center',
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

function MapScreen({ navigation }) {
  const [allEvents, setAllEvents] = useState([]);
  const [allResources, setAllResources] = useState([]);

  const getAllEvents = async () => {
    try {
      const result = await axios.get(`${URL}/event/get`);
      setAllEvents(result.data);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const getAllResources = async () => {
    try {
      const result = await axios.get(`${URL}/resource/get`);
      setAllResources(result.data);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  useEffect(() => {
    getAllEvents();
    getAllResources();
  }, []);

  const state = {
    region: {
      latitude: 34.0442,
      longitude: -118.2439,
      latitudeDelta: 0.005, // smaller value = more zoomed in
      longitudeDelta: 0.005,
    },
  };

  const allCards = allEvents.concat(allResources);

  const mapRef = useRef(null);
  mapRef.index = 0;
  mapRef.animation = new Animated.Value(0);

  useEffect(() => {
    mapRef.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      index = Math.max(0, Math.min(index, allCards.length - 1));

      clearTimeout(mapRef.regionTimeout);
      mapRef.regionTimeout = setTimeout(() => {
        if ((mapRef.index !== index) || (mapRef.index === 0 && index === 0)) {
          mapRef.index = index;
          const coordinate = allCards[index].location.coordinates;
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
  }, [mapRef.animation]);

  const interpolations = allCards.map((_, index) => {
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
      {/* <Button title="Workshop">Workshop</Button>
      <Button title="Food">Food</Button>
      <Button title="Shelter">Shelter</Button>
      <Button title="Mission">Mission</Button>
      <Button title="Shower/Laundry">Shower/Laundry</Button> */}
      <MapView
        ref={mapRef}
        initialRegion={state.region}
        style={styles.container}
      >
        <MapMarker
          allCards={allCards}
          interpolations={interpolations}
        />
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
            key={event._id}
            id={event._id}
            image={{ uri: event.images[0] }}
            title={event.title}
            description={event.description}
            startDate={new Date(event.startDate)}
            endDate={new Date(event.endDate)}
            isEvent
          />
        ))}
        {allResources.map((resource) => (
          <MapCard
            key={resource._id}
            id={resource._id}
            image={{ uri: resource.icon }}
            title={resource.title}
            description={resource.description}
            startDate={new Date(resource.startDate)}
            endDate={new Date(resource.endDate)}
            isEvent={false}
          />
        ))}
        <Button
          // BUTTON FOR TESTING ONLY
          title="Return to Sign Up"
          onPress={() => {
            navigation.navigate('Sign Up');
          }}
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
