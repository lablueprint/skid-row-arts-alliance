import * as React from 'react';
import {
  StyleSheet, Image, Text, View, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

const styles = StyleSheet.create({
  card: {
    borderRadius: 13,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardImage: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  tag: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#F5E1E9',
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
  title: {
    fontSize: 16,
    fontFamily: 'MontserratSemiBold',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 7,
    color: '#1E2021',
  },
  time: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    paddingHorizontal: 15,
    paddingBottom: 20,
    color: '#53595C',
  },
});

function EventCard({
  id,
  image,
  location,
  title,
  description,
  startTime,
  endTime,
  day,
  week,
  startDate,
  tag,
  navigation,
  phoneNumber,
  organization,
  recurringMonthly,
  recurringWeekly,
  website,
}) {
  let [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });
  if (!fontsLoaded) {
    console.log('Loading font...');
  }

  const onPressEvent = () => {
    navigation.navigate('Event Details', {
      id,
      image,
      location,
      title,
      day,
      week,
      startTime,
      endTime,
      description,
      startDate,
      phoneNumber,
      organization,
      recurringMonthly,
      recurringWeekly,
      website,
    });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onPressEvent()}>
        <View>
          <Image
            source={image}
            style={styles.cardImage}
          />
          <View style={styles.tag}>
            <Image
              source={require('../assets/brush.png')}
              style={styles.tagImage}
            />
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>
            {startTime}
            -
            {endTime}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.number.isRequired,
  location: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    specialinstructions: PropTypes.string,
    coordinates: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }).isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  day: PropTypes.number.isRequired,
  week: PropTypes.number.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  recurringMonthly: PropTypes.bool.isRequired,
  recurringWeekly: PropTypes.bool.isRequired,
  website: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default EventCard;
