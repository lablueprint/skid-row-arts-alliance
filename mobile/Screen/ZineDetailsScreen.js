import {
  React, useState, useRef,
} from 'react';
import {
  StyleSheet, Text, View, Dimensions,
  Animated, ScrollView,
} from 'react-native';
import Pdf from 'react-native-pdf';
import { Slider } from '@miblanchard/react-native-slider';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');

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
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  panelHeader: {
    height: 60,
    backgroundColor: '#b197fc',
    justifyContent: 'center',
    padding: 10,
  },
  textHeader: {
    fontSize: 16,
    color: '#FFF',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    zIndex: 1,
  },
  iconBg: {
    backgroundColor: '#2b8a3e',
    position: 'absolute',
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
  },
});

function ZineDetailsScreen({ navigation, route }) {
  const {
    title, date, contents, url,
  } = route.params;
  let ref;
  const [pages, setPages] = useState(1);
  const source = { uri: url, cache: true };
  const [currentValue, setCurrentValue] = useState(1);
  const handleOnSliderChange = (newValue) => {
    const value = Number(newValue);
    setCurrentValue(value);
    ref.setPage(value);
  };
  const draggedValue = useRef(new Animated.Value(180)).current;
  const draggableRange = { top: 670, bottom: 0 };
  const { top } = draggableRange;

  const backgoundOpacity = draggedValue.interpolate({
    inputRange: [height - 48, height],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const iconTranslateY = draggedValue.interpolate({
    inputRange: [height - 56, height, top],
    outputRange: [0, 56, 180 - 32],
    extrapolate: 'clamp',
  });

  const panel = useRef(null);

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{date}</Text>
      <Text onPress={() => panel.current.show(360)}>Table of Contents</Text>
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
          handleOnSliderChange(page);
        }}
        style={styles.pdf}
      />
      <Slider
        value={currentValue}
        minimumValue={1}
        maximumValue={pages}
        step={1}
        minimumTrackTintColor="orange"
        onSlidingComplete={(newSliderValue) => handleOnSliderChange(newSliderValue)}
      />
      <SlidingUpPanel
        ref={panel}
        draggableRange={draggableRange}
        animatedValue={draggedValue}
        snappingPoints={[360]}
        height={height}
        friction={0.5}
      >
        <View style={styles.panel}>
          <Animated.View
            style={[styles.iconBg, {
              opacity: backgoundOpacity,
              transform: [{ translateY: iconTranslateY }],
            },
            ]}
          />
          <View style={styles.panelHeader}>
            <Animated.View>
              <Text style={styles.textHeader}>Contents</Text>
            </Animated.View>
          </View>
          <ScrollView>
            {contents.map((content) => (
              <Button onPress={() => { handleOnSliderChange(content.sectionPage); }}>
                {content.sectionTitle}
              </Button>
            ))}
          </ScrollView>
          <View />
        </View>
      </SlidingUpPanel>
    </View>
  );
}

ZineDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      contents: PropTypes.arrayOf(
        PropTypes.shape({
          sectionTitle: PropTypes.string.isRequired,
          sectionPage: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ZineDetailsScreen;
