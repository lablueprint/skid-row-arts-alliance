import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventMarker: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(130,4,150, 0.9)',
  },
  resourceMarker: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(255,127,80, 0.9)',
  },
});

function MapMarker({ allCards, interpolations }) {
  const markers = allCards.map((marker, index) => {
    const opacityStyle = {
      opacity: interpolations[index].opacity,
    };

    return (
      // eslint-disable-next-line no-underscore-dangle
      <Marker key={marker._id} coordinate={marker.location.coordinates}>
        <Animated.View style={[styles.markerWrap, opacityStyle]}>
          <View style={marker.isResource ? styles.resourceMarker : styles.eventMarker} />
        </Animated.View>
      </Marker>
    );
  });

  return markers;
}

MapMarker.propTypes = {
  interpolations: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default MapMarker;
