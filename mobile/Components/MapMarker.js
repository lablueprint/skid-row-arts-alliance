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

function MapMarker({ allCards, interpolations }) {
  const markers = allCards.map((marker, index) => {
    const opacityStyle = {
      opacity: interpolations[index].opacity,
    };
    return (
      // eslint-disable-next-line no-underscore-dangle
      <Marker key={marker._id} coordinate={marker.location.coordinates}>
        <Animated.View style={[styles.markerWrap, opacityStyle]}>
          <View style={styles.marker} />
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
