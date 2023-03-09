import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';

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

function MapMarker({ state, interpolations }) {
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
}

MapMarker.propTypes = {
  state: PropTypes.shape({
    markers: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.string,
      PropTypes.object,
    ])).isRequired,
    region: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number,
    }).isRequired,
  }).isRequired,
  interpolations: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default MapMarker;
