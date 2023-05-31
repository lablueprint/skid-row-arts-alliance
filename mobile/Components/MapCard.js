import React from 'react';
import {
  StyleSheet, View, Image, Text, Dimensions, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

const { height } = Dimensions.get('window');
const CARD_HEIGHT = (3 * height) / 10;
const CARD_WIDTH = CARD_HEIGHT + 50;

const styles = StyleSheet.create({
  card: {
    borderRadius: 13,
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
    borderRadiusTop: 8,
    width: '100%',
    height: 70,
    alignSelf: 'center',
  },
  tag: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#F5E1E9E5',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    top: 10,
  },
  tagImage: {
    height: 15,
    width: 15,
  },
  tagText: {
    color: '#D26090',
    fontFamily: 'Montserrat',
    paddingLeft: 6,
    fontSize: 14,
  },
  textContent: {
    flex: 1,
    marginTop: 10,
    padding: 15,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'MontserratMedium',
    fontSize: 18,
    marginBottom: 5,
  },
  organization: {
    fontFamily: 'Montserrat',
    color: '#5B6772',
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,
  },
  infoIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  infoText: {
    fontFamily: 'Montserrat',
    color: '#53595C',
  },
  detailsButton: {
    backgroundColor: '#4C4C9B',
    padding: 10,
    margin: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#F8F8F8',
    fontFamily: 'MontserratSemiBold',
  },
});

const onPressEvent = () => {
  navigation.navigate('Event Details', {
    key,
    id,
    image,
    location,
    title,
    description,
    startDate,
    endDate,
    tag,
    phoneNumber,
    organization,
    recurringMonthly,
    recurringWeekly,
    website,
    organizationDescription,
  });
};

function MapCard({
  key,
  id,
  image,
  location,
  title,
  description,
  startDate,
  endDate,
  tag,
  phoneNumber,
  organization,
  recurringMonthly,
  recurringWeekly,
  website,
  organizationDescription,
  isEvent,
}) {
  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });
  return (
    <View style={styles.card} key={id}>
      <View>
        <Image
          source={image}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.tag}>
          <Image
            source={require('../assets/map/brush.png')}
            style={styles.tagImage}
          />
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      </View>
      <View style={styles.textContent}>
        <Text style={styles.organization}>
          {organization}
        </Text>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.row}>
          <Image
            source={require('../assets/map/calendar.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            lorem ipsum
          </Text>
        </View>
        <View style={styles.row}>
          <Image
            source={require('../assets/map/location.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            lorem ipsum
          </Text>
        </View>
      </View>
      {isEvent
      && (
        <TouchableOpacity style={styles.detailsButton} onPress={() => onPressEvent()}>
          <Text style={styles.detailsButtonText}>
            More Details
            {'  >'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

MapCard.propTypes = {
  key: PropTypes.string,
  id: PropTypes.string.isRequired,
  image: PropTypes.shape.isRequired,
  location: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    specialinstructions: PropTypes.string,
    coordinates: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
  title: PropTypes.string.isRequired,
  descriptions: PropTypes.string,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  tag: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  organization: PropTypes.string,
  recurringMonthly: PropTypes.bool,
  recurringWeekly: PropTypes.bool,
  website: PropTypes.string,
  organizationDescription: PropTypes.string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

// MapCard.defaultProps = {
//   image: '',
//   description: '',
//   tag: 'tagPlaceholder',
//   organization: 'organizationPlaceholder',
// };

export default MapCard;
