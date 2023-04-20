import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import MapCard from '../Components/MapCard';
import MapMarker from '../Components/MapMarker';

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT + 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 1,
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
    position: 'absolute',
    zIndex: 1,
  },
});

function MapScreen({ navigation }) {
  const [allEvents, setAllEvents] = useState([]);
  const [allResources, setAllResources] = useState([]);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);

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

  const onMarkerPress = (index) => {
    mapRef.animation.setValue(index * CARD_WIDTH);
    setActiveMarkerIndex(index);
    scrollViewRef.current.scrollTo({
      x: index * CARD_WIDTH,
      animated: true,
    });
  };

  const onPressEvent = () => {
    navigation.navigate('Filter');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onPressEvent()}>
        <Text>
          Filter
        </Text>
      </TouchableOpacity>
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
            key={event.EventData._id}
            id={event.EventData._id}
            image={{ uri: event.ImageURL }}
            title={event.EventData.title}
            description={event.EventData.description}
            startDate={new Date(event.EventData.startDate)}
            endDate={new Date(event.EventData.endDate)}
            isEvent
          />
        ))}
        {allResources.map((resource) => (
          <MapCard
            key={resource.ResourceData._id}
            id={resource.ResourceData._id}
            image={{ uri: resource.ImageURL }}
            title={resource.ResourceData.title}
            description={resource.ResourceData.description}
            startDate={new Date(resource.ResourceData.startDate)}
            endDate={new Date(resource.ResourceData.endDate)}
            isEvent={false}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

export default MapScreen;

MapScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
/*
<Button title="Food">Food</Button>
<Button title="Shelter">Shelter</Button>
<Button title="Mission">Mission</Button>
<Button title="Shower/Laundry">Shower/Laundry</Button>
*/
