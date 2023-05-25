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
  key,
  id,
  image,
  location,
  title,
  description,
  startDate,
  endDate,
  tag,
  navigation,
  phoneNumber,
  organization,
  recurringMonthly,
  recurringWeekly,
  website,
  organizationDescription,
}) {
  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
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

  function formatTime(dateObject) {
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    let formattedHours = hours % 12;
    formattedHours = formattedHours === 0 ? 12 : formattedHours;
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  const startTime = formatTime(new Date(startDate));
  const endTime = formatTime(new Date(endDate));

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPressEvent}>
        <View>
          <Image
            source={{ uri: image }}
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
            {' '}
            -
            {' '}
            {endTime}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

EventCard.propTypes = {
  key: PropTypes.string,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
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

export default EventCard;
