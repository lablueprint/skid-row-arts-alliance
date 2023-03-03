import { React, useState, useRef } from 'react';
import {
  StyleSheet, Text, View, Dimensions,
  Animated,
} from 'react-native';
import Pdf from 'react-native-pdf';
import { Slider } from '@miblanchard/react-native-slider';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  panelHeader: {
    height: 180,
    backgroundColor: '#b197fc',
    justifyContent: 'flex-end',
    padding: 24,
  },
  textHeader: {
    fontSize: 28,
    color: '#FFF',
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
};

function ZineDetailsScreen({ draggableRange = { top: height + 180 - 64, bottom: 180 } }) {
  const _draggedValue = useRef(new Animated.Value(180)).current;

  const { top, bottom } = draggableRange;

  const backgoundOpacity = _draggedValue.interpolate({
    inputRange: [height - 48, height],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const iconTranslateY = _draggedValue.interpolate({
    inputRange: [height - 56, height, top],
    outputRange: [0, 56, 180 - 32],
    extrapolate: 'clamp',
  });

  const textTranslateY = _draggedValue.interpolate({
    inputRange: [bottom, top],
    outputRange: [0, 8],
    extrapolate: 'clamp',
  });

  const textTranslateX = _draggedValue.interpolate({
    inputRange: [bottom, top],
    outputRange: [0, -112],
    extrapolate: 'clamp',
  });

  const textScale = _draggedValue.interpolate({
    inputRange: [bottom, top],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });

  const panel = useRef(null);

  return (
    <View style={styles.container}>
      <Text onPress={() => panel.current.show(360)}>Show panel</Text>
      <SlidingUpPanel
        ref={panel}
        draggableRange={draggableRange}
        animatedValue={_draggedValue}
        snappingPoints={[360]}
        height={height + 180}
        friction={0.5}
      >
        <View style={styles.panel}>
          <Animated.View
            style={[styles.iconBg, { opacity: backgoundOpacity, transform: [{ translateY: iconTranslateY }] },
            ]}
          />
          <View style={styles.panelHeader}>
            <Animated.View
              style={{
                transform: [
                  { translateY: textTranslateY },
                  { translateX: textTranslateX },
                  { scale: textScale },
                ],
              }}
            >
              <Text style={styles.textHeader}>Sliding Up Panel</Text>
            </Animated.View>
          </View>
        </View>
      </SlidingUpPanel>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'stretch',
//     justifyContent: 'center',
//   },
//   panelHeader: {
//     height: 180,
//     backgroundColor: '#b197fc',
//     justifyContent: 'flex-end',
//     padding: 24,
//   },
//   textHeader: {
//     fontSize: 28,
//     color: '#FFF',
//   },
//   pdf: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });

// function ZineDetailsScreen({ navigation, route }) {
//   const { title, date, url } = route.params;
//   let ref;
//   let c;
//   const [pages, setPages] = useState(1);
//   const source = { uri: url, cache: true };
//   const [currentValue, setCurrentValue] = useState(1);
//   const handleOnSliderChange = (newValue) => {
//     const value = Number(newValue);
//     setCurrentValue(value);
//     ref.setPage(value);
//   };

//   return (
//     <View style={styles.container}>
//       <Text>{title}</Text>
//       <Text>{date}</Text>
//       <Button
//         title="Back to Zines"
//         onPress={() => {
//           navigation.navigate('Zine Gallery');
//         }}
//       />
//       <Pdf
//         source={source}
//         ref={(pdf) => { ref = pdf; }}
//         horizontal
//         onLoadComplete={(numberOfPages) => {
//           setPages(numberOfPages);
//         }}
//         onPageChanged={(page) => {
//           handleOnSliderChange(page);
//         }}
//         style={styles.pdf}
//       />
//       <Slider
//         value={currentValue}
//         minimumValue={1}
//         maximumValue={pages}
//         step={1}
//         minimumTrackTintColor="orange"
//         onSlidingComplete={(newSliderValue) => handleOnSliderChange(newSliderValue)}
//       />
//       <SlidingUpPanel
//       draggableRange={top: 180, bottom: 10}
//       >
//         <View style={styles.panelHeader} />
//         <View style={styles.container}>
//           <Text>Here is the content inside panel</Text>
//           <Button onPress={() => { handleOnSliderChange(11); }}>Press</Button>
//         </View>
//       </SlidingUpPanel>
//     </View>
//   );
// }

ZineDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ZineDetailsScreen;
