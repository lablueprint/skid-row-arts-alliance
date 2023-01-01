import React from 'react';
import {
  Dimensions, StyleSheet, Text, View,
} from 'react-native';
// import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import Pdf from 'react-native-pdf';
// import { URL } from '@env';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

function MapScreen() {
  // const test = async () => {
  //   console.log(URL);
  //   try {
  //     const result = await axios.post(`${URL}/test/post`, {
  //       name: 'James', age: 20,
  //     });
  //     console.log(result.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };

  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
      {/* <Button title="Test" onPress={test} /> */}
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

export default MapScreen;
