import React from 'react';
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
    justifyContent: 'center',
  },
});

function MapScreen() {
  const test = async () => {
    console.log(URL);
    try {
      const result = await axios.post(`${URL}/test/post`, {
        name: 'James', age: 20,
      });
      console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
      <Button title="Test" onPress={test} />
    </View>
  );
}

export default MapScreen;
