import React from 'react';
import { StyleSheet, Animated, View, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 50,
    height: 50,
  },
});

function MapMarker({ allCards, interpolations, onMarkerPress }) {
  const markers = allCards.map((marker, index) => {
    const opacityStyle = {
      opacity: interpolations[index].opacity,
    };

    let markerImage;
    if (!marker.startDate) { // Resources don't have startDates
      switch (marker.resourceType) {
        case 'food':
          markerImage = require('../assets/foodIcon.png');
          break;
        case 'shelter':
          markerImage = require('../assets/shelterIcon.png');
          break;
        case 'mission':
          markerImage = require('../assets/missionIcon.png');
          break;
        case 'shower':
          markerImage = require('../assets/showerLaundryIcon.png');
          break;
        case 'social':
          markerImage = require('../assets/socialServiceIcon.png');
          break;
        case 'legal':
          markerImage = require('../assets/legalServiceIcon.png');
          break;
        default:
          markerImage = require('../assets/workshopIcon.png');
      }
    }

    return (
      <Marker key={marker._id} coordinate={marker.location.coordinates} onPress={() => onMarkerPress(index)}>
        <Animated.View style={[styles.markerWrap, opacityStyle]}>
          <View style={{ overflow: 'visible' }}>
            {marker.startDate ? (
              <Image
                source={require('../assets/workshopIcon.png')}
                style={[styles.marker]}
              />
            ) : (
              <Image
                source={markerImage}
                style={[styles.marker]}
              />
            )}
          </View>
        </Animated.View>
      </Marker>
    );
  });

  return markers;
}

MapMarker.propTypes = {
  interpolations: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onMarkerPress: PropTypes.func.isRequired,
};

export default MapMarker;
