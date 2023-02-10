import { React, useState } from 'react';
import {
  StyleSheet, Text, View, Dimensions,
} from 'react-native';
import Pdf from 'react-native-pdf';
import { Slider } from '@miblanchard/react-native-slider';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

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

function ZineDetailsScreen({ navigation, route }) {
  const { title, date, url } = route.params;
  let ref;
  const [pages, setPages] = useState(1);
  const source = { uri: url, cache: true };
  const [currentValue, setCurrentValue] = useState(1);
  const handleOnSliderChange = (newValue) => {
    const value = Number(newValue);
    setCurrentValue(value);
    ref.setPage(value);
  };

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{date}</Text>
      <Button
        title="Back to Zines"
        onPress={() => {
          navigation.navigate('Zine Gallery');
        }}
      />
      <Pdf
        source={source}
        ref={(pdf) => { ref = pdf; }}
        horizontal
        onLoadComplete={(numberOfPages) => {
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

ZineDetailsScreen.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ZineDetailsScreen;
