import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function GalleryScreen() {
  return (
    <View style={styles.container}>
      <Text>Gallery Screen</Text>
    </View>
  );
}

export default GalleryScreen;
