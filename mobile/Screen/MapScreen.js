import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { URL } from '@env';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import MapCard from '../Components/MapCard';
import MapMarker from '../Components/MapMarker';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = (3 * height) / 10;
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
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
});

function MapScreen({navigation}) {
  const resourceThumbnails = {
    shelter: require('../assets/resourceThumbnails/shelter.png'),
    'legal services': require('../assets/resourceThumbnails/legalServices.png'),
    mission: require('../assets/resourceThumbnails/mission.png'),
    shower: require('../assets/resourceThumbnails/shower.png'),
    food: require('../assets/resourceThumbnails/food.png'),
    'social services': require('../assets/resourceThumbnails/socialServices.png'),
    health: require('../assets/resourceThumbnails/health.png'),
  };

  const eventThumbnails = {
    'art & community': require('../assets/eventThumbnails/artCommunity.png'),
    exhibit: require('../assets/eventThumbnails/exhibit.png'),
    film: require('../assets/eventThumbnails/film.png'),
    music: require('../assets/eventThumbnails/music.png'),
    performance: require('../assets/eventThumbnails/performance.png'),
    'spoken word': require('../assets/eventThumbnails/spokenWord.png'),
    miscellaneous: require('../assets/eventThumbnails/miscellaneous.png'),
    'visual art': require('../assets/eventThumbnails/visualArt.png'),
  };
  const [allEvents, setAllEvents] = useState([]);
  const [allResources, setAllResources] = useState([]);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);
  const { authHeader } = useSelector((state) => state.auth);

  const getAllEvents = async () => {
    try {
      const result = await axios.get(`${URL}/event/get`, {
        headers: authHeader,
      });
      setAllEvents(result.data || []);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const getAllResources = async () => {
    try {
      const result = await axios.get(`${URL}/resource/get`, {
        headers: authHeader,
      });
      setAllResources(result.data || []);
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

  const allCards = allEvents.map((event) => event.EventData)
    .concat(allResources.map((resource) => resource.ResourceData));
  const scrollViewRef = useRef(null);
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
          const coordinate = allCards[index].location.coordinates || [];
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

  const onMarkerPress = (index) => {
    mapRef.animation.setValue(index * CARD_WIDTH);
    setActiveMarkerIndex(index);
    scrollViewRef.current.scrollTo({
      x: index * CARD_WIDTH,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={state.region}
        style={styles.container}
      >
        <MapMarker
          allCards={allCards}
          interpolations={interpolations}
          onMarkerPress={onMarkerPress}
        />

      </MapView>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
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
            id={event.EventData._id}
            startTime={event.EventData.dateDetails.startTime}
            endTime={event.EventData.dateDetails.endTime}
            day={event.EventData.dateDetails.day}
            week={event.EventData.dateDetails.week}
            image={eventThumbnails[event.EventData.tag]}
            title={event.EventData.title}
            location={event.EventData.locationDetails}
            description={event.EventData.description}
            startDate={new Date(event.EventData.dateDetails.date)}
            tag={event.EventData.tag}
            organization={event.EventData.host}
            recurringMonthly={event.EventData.dateDetails.recurring === 'Monthly'}
            recurringWeekly={event.EventData.dateDetails.recurring === 'Weekly'}
            navigation={navigation}
            isEvent
          />
        ))}
        {allResources.map((resource) => (
          <MapCard
            id={resource.ResourceData._id}
            image={resourceThumbnails[resource.ResourceData.tag]}
            title={resource.ResourceData.title}
            location={resource.ResourceData.locationDetails}
            startTime={resource.ResourceData.dateDetails.startTime}
            endTime={resource.ResrouceData.dateDetails.endTime}
            days={resource.ResourceData.dateDetails.days}
            description={resource.ResourceData.description}
            tag={resource.ResourceData.tag}
            phoneNumber={resource.ResourceData.phoneNumber}
            website={resource.ResourceData.website}
            email={resource.ResourceData.email}
            navigation={navigation}
            isEvent={false}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

export default MapScreen;
