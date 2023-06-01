import { React, useState, useRef } from 'react';
import {
  StyleSheet, Text, View, Dimensions,
  Animated, ScrollView, Image, TouchableOpacity,
} from 'react-native';
import Pdf from 'react-native-pdf';
import { Slider } from '@miblanchard/react-native-slider';
import SlidingUpPanel from 'rn-sliding-up-panel';
import PropTypes from 'prop-types';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

const { height } = Dimensions.get('window').height;

const BackButton = require('../assets/backArrowWhite.png');
const PreviousButton = require('../assets/backArrow.png');
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
    height: Dimensions.get('window').height * 0.10,
    padding: 10,
    paddingTop: Dimensions.get('window').height * 0.055,
    paddingBottom: 15,
    backgroundColor: '#4C4C9B',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height * 0.02,
    fontFamily: 'MontserratSemiBold',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelHeader: {
    height: 60,
    backgroundColor: '#E7E9EC',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.95,
  },
  textHeader: {
    fontSize: Dimensions.get('window').height * 0.02,
    alignItems: 'center',
    fontFamily: 'MontserratBold',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 2,
  },
  slider: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginHorizontal: Dimensions.get('window').width * 0.10,
    width: Dimensions.get('window').width * 0.75,
  },
  counterContainer: {
    marginTop: 5,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageCounter: {
    fontSize: Dimensions.get('window').height * 0.018,
    fontFamily: 'MontserratBold',
  },
  contents: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.9,
  },
  contentTitleContainer: {
    width: Dimensions.get('window').width * 0.85,
  },
  contentsText: {
    fontSize: Dimensions.get('window').height * 0.018,
    fontFamily: 'Montserrat',
  },
  contentsNumber: {
    fontSize: Dimensions.get('window').height * 0.018,
    fontFamily: 'Montserrat',
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: Dimensions.get('window').width * 0.05,
    paddingTop: Dimensions.get('window').height * 0.02,
  },
  thumb: {
    backgroundColor: '#F8F8F8',
    borderRadius: 30 / 2,
    height: 25,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    width: 25,
  },
  line: {
    height: 1,
    backgroundColor: '#C4C8CA',
  },
  flipped: {
    transform: [{ scaleX: -1 }],
  },
  hidden: {
    tintColor: '#E7E9EC',
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
    if (newValue > 0 && newValue <= pages) {
      const value = Number(newValue);
      setCurrentValue(value);
      ref.setPage(value);
    }
  };
  const draggedValue = useRef(new Animated.Value(0)).current;
  const draggableRange = { top: 670, bottom: 0 };

  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });

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
      <View style={styles.navContainer}>
        <TouchableOpacity
          onPress={() => {
            handleOnSliderChange(currentValue - 1);
          }}
        >
          <Image
            source={PreviousButton}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <View style={styles.slider}>
          <Slider
            value={currentValue}
            minimumValue={1}
            maximumValue={pages}
            step={1}
            minimumTrackTintColor="#7373BA"
            thumbStyle={styles.thumb}
            onSlidingComplete={(newSliderValue) => handleOnSliderChange(newSliderValue)}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            handleOnSliderChange(currentValue + 1);
          }}
        >
          <Image
            source={PreviousButton}
            style={styles.flipped}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.counterContainer}>
        <Text style={styles.pageCounter}>
          {currentValue}
          /
          {pages}
        </Text>
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
            <TouchableOpacity
              onPress={() => panel.current.hide()}
            >
              <Image
                source={PreviousButton}
                style={styles.backButton}
              />
            </TouchableOpacity>
            <Animated.View>
              <Text style={styles.textHeader}>Contents</Text>
            </Animated.View>
            <Image
              source={PreviousButton}
              style={styles.hidden}
            />
          </View>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {contents.map((content) => (
              <TouchableOpacity
                style={styles.contents}
                onPress={() => { handleOnSliderChange(content.sectionPage); }}
              >
                <View>
                  <View style={styles.contentSelection}>
                    <View style={styles.contentTitleContainer}>
                      <Text style={styles.contentsText} numberOfLines={1} ellipsizeMode="tail">{content.sectionTitle}</Text>
                    </View>
                    <Text style={styles.contentsNumber}>{content.sectionPage}</Text>
                  </View>
                  <View style={styles.line} />
                </View>
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
