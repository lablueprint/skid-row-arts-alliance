import React from 'react';
import {
  StyleSheet, View, Image, Text, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import AddCalendarButton from './AddCalendarButton';

const { height } = Dimensions.get('window');
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT + 50;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    borderRadius: 8,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
});

function MapCard({
  id, image, title, description, startDate, endDate, isEvent,
}) {
  return (
    <View style={styles.card} key={id}>
      <Image
        source={image}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.textContent}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.cardDescription}>
          {description}
        </Text>
      </View>
      {isEvent
        // eslint-disable-next-line max-len
        && <AddCalendarButton eventName={title} eventStartDate={startDate} eventEndDate={endDate} />}
    </View>
  );
}

MapCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.shape(),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  isEvent: PropTypes.bool.isRequired,
};

MapCard.defaultProps = {
  image: '',
  description: '',
};

export default MapCard;
