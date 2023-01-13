import React, { useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  Button, StyleSheet, Text, View,
} from 'react-native';
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { URL } from '@env';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 15,
    backgroundColor: 'lightblue',
  },
});

function MapScreen() {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 34.0442,
    longitude: -118.2439,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const museumRegion = {
    latitude: 34.051125,
    longitude: -118.247752,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };
  const churchRegion = {
    latitude: 34.042487,
    longitude: -118.245308,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };
  const missionRegion = {
    latitude: 34.042383,
    longitude: -118.245800,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };
  const goToMuseum = () => {
    mapRef.current.animateToRegion(museumRegion, 3 * 1000);
  };
  const goToChurch = () => {
    mapRef.current.animateToRegion(churchRegion, 3 * 1000);
  };
  const goToMission = () => {
    mapRef.current.animateToRegion(missionRegion, 3 * 1000);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 34.0442,
          longitude: -118.2439,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        <Marker
          coordinate={{ latitude: museumRegion.latitude, longitude: museumRegion.longitude }}
        />
        <Marker
          coordinate={{ latitude: churchRegion.latitude, longitude: churchRegion.longitude }}
        />
        <Marker
          coordinate={{ latitude: missionRegion.latitude, longitude: missionRegion.longitude }}
        />
      </MapView>
      <Button onPress={() => goToMuseum()} title="1) Museum" />
      <Button onPress={() => goToChurch()} title="2) Church" />
      <Button onPress={() => goToMission()} title="3) Mission" />
    </View>
  );
}

export default MapScreen;
