import { React, useState, useRef } from 'react';
import {
  StyleSheet, Text, View, Dimensions,
  Animated, ScrollView, Image, TouchableOpacity,
} from 'react-native';
import Pdf from 'react-native-pdf';
import { Slider } from '@miblanchard/react-native-slider';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');
const BackButton = require('../assets/backArrowWhite.png');
const ThreeLines = require('../assets/tableOfContents.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 30,
    paddingBottom: 15,
    backgroundColor: '#4C4C9B',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  icons: {
    height: '5%',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#53595C',
  },
  panel: {
    flex: 1,
    backgroundColor: '#E7E9EC',
    position: 'relative',
  },
  panelHeader: {
    height: 60,
    backgroundColor: '#E7E9EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 16,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 2,
  },
  slider: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 15,
    paddingBottom: 10,
  },
  counterContainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageCounter: {
    fontSize: 16,
  },
  contents: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  contentsText: {
    fontSize: 13,
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
  const draggedValue = useRef(new Animated.Value(0)).current;
  const draggableRange = { top: 670, bottom: 0 };

  const panel = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Zines');
          }}
        >
          <Image
            source={BackButton}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{date}</Text>
        <TouchableOpacity onPress={() => panel.current.show(300)}>
          <Image
            source={ThreeLines}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
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
      <View style={styles.slider}>
        <Slider
          value={currentValue}
          minimumValue={1}
          maximumValue={pages}
          step={1}
          minimumTrackTintColor="orange"
          onSlidingComplete={(newSliderValue) => handleOnSliderChange(newSliderValue)}
        />
        <View style={styles.counterContainer}>
          <Text style={styles.pageCounter}>
            {currentValue}
            /
            {pages}
          </Text>
        </View>
      </View>
      <SlidingUpPanel
        ref={panel}
        draggableRange={draggableRange}
        animatedValue={draggedValue}
        snappingPoints={[300]}
        height={height}
        friction={0.5}
      >
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Animated.View>
              <Text style={styles.textHeader}>Contents</Text>
            </Animated.View>
          </View>
          <ScrollView>
            {contents.map((content) => (
              <TouchableOpacity
                style={styles.contents}
                onPress={() => { handleOnSliderChange(content.sectionPage); }}
              >
                <Text style={styles.contentsText}>{content.sectionTitle}</Text>
                <Text style={styles.contentsText}>{content.sectionPage}</Text>
              </TouchableOpacity>
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
