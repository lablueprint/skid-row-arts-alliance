import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { Marker } from 'react-native-maps';

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(130,4,150, 0.9)',
  },
});

const MapMarker = ({ state, interpolations }) => {
  const markers = state.markers.map((marker, index) => {
    const opacityStyle = {
      opacity: interpolations[index].opacity,
    };
    return (
      <Marker key={marker.id} coordinate={marker.coordinate}>
        <Animated.View style={[styles.markerWrap, opacityStyle]}>
          <View style={styles.marker} />
        </Animated.View>
      </Marker>
    );
  });

  return markers;
};

export default MapMarker;
