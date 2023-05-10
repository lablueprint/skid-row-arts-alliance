import React, { useEffect } from 'react';
import {
  StyleSheet, View, Text, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
  },
  square: {
    width: 40,
    height: 40,
    backgroundColor: '#D9D9D9',
    margin: 40,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function ArtworkFilterScreen({
  route,
}) {
  useEffect(() => {
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Text>Artwork Filter Screen</Text>
      </View>
    </ScrollView>
  );
}

ArtworkFilterScreen.propTypes = {
  route: PropTypes.shape().isRequired,
};

export default ArtworkFilterScreen;
