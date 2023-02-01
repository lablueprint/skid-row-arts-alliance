import { React, useState } from 'react';
import {
  Dimensions, StyleSheet, Text, View,
} from 'react-native';
// import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import Pdf from 'react-native-pdf';
// import { URL } from '@env';
import { Slider } from '@miblanchard/react-native-slider';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
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
  let ref;
  const [pages, setPages] = useState(1);
  const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
  const [currentValue, setCurrentValue] = useState(1);
  const handleOnSliderChange = (newValue) => {
    const value = Number(newValue);
    setCurrentValue(value);
    ref.setPage(value);
  };

  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
      {/* <Button title="Test" onPress={test} /> */}
      <Pdf
        source={source}
        ref={(pdf) => { ref = pdf; }}
        horizontal
        onLoadComplete={(numberOfPages) => {
          console.log(`Number of pages: ${numberOfPages}`);
          setPages(numberOfPages);
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
      <Slider
        value={currentValue}
        minimumValue={1}
        maximumValue={pages}
        step={1}
        minimumTrackTintColor="orange"
        onSlidingStart={(newSliderValue) => console.log('on sliding start: ', newSliderValue)}
        onSlidingComplete={(newSliderValue) => handleOnSliderChange(newSliderValue)}
      />
      <Button onPress={() => { handleOnSliderChange(11); }}>Press</Button>
    </View>
  );
}

export default MapScreen;
