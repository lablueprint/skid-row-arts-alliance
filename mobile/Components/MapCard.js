import React from 'react';
import {
  StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, ScrollView,
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
  eventTag: {
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
    height: 14,
    width: 14,
  },
  eventTagText: {
    color: '#D26090',
    fontFamily: 'Montserrat',
    paddingLeft: 6,
    fontSize: 14,
  },
  resourceTag: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#F3DECC',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    top: 10,
  },
  resourceTagText: {
    color: '#B96F30',
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

function MapCard({
  id,
  image,
  location,
  title,
  day,
  days,
  week,
  startTime,
  endTime,
  description,
  startDate,
  tag,
  phoneNumber,
  email,
  website,
  organization,
  recurringMonthly,
  recurringWeekly,
  navigation,
  isEvent,
}) {
  let [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    console.log('Loading font...');
  }

  const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let eventDay;
  let daysOfWeek = [];

  if (isEvent) {
    eventDay = weekdayNames[day];
  } else {
    const formatConsecutiveDays = (weekdays) => {
      weekdays.sort(); // Sort the days in ascending order
      const res = [];
      let rangeStart = weekdays[0];
      for (let i = 1; i <= weekdays.length; i += 1) {
        if (i === weekdays.length || weekdays[i] !== weekdays[i - 1] + 1) {
          if (i - rangeStart >= 2) {
            res.push(`${weekdayNames[rangeStart]}-${weekdayNames[weekdays[i - 1]]}`);
          } else {
            res.push(weekdayNames[rangeStart]);
            if (i - rangeStart === 2) {
              res.push(weekdayNames[rangeStart + 1]);
            }
          }
          rangeStart = weekdays[i];
        }
      }
      return res;
    };
    daysOfWeek = formatConsecutiveDays(days);
  }

  let tagIcon;
  if (!isEvent) { // Resources don't have startDates
    switch (tag) {
      case 'food':
        tagIcon = require('../assets/map/foodTag.png');
        break;
      case 'shelter':
        tagIcon = require('../assets/map/shelterTag.png');
        break;
      case 'mission':
        tagIcon = require('../assets/map/missionTag.png');
        break;
      case 'shower':
        tagIcon = require('../assets/map/showerTag.png');
        break;
      case 'social':
        tagIcon = require('../assets/map/socialTag.png');
        break;
      case 'legal':
        tagIcon = require('../assets/map/legalTag.png');
        break;
      default:
        tagIcon = require('../assets/map/shelterTag.png');
    }
  }

  const onPressEvent = () => {
    if (isEvent) {
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
      });
    } else {
      navigation.navigate('Resource Details', {
        id,
        title,
        image,
        location,
        days,
        startTime,
        endTime,
        tag,
        phoneNumber,
        email,
        website,
      });
    }
  };

  return (
    <View style={styles.card} key={id}>
      <View>
        <Image
          source={image}
          style={styles.cardImage}
          resizeMode="cover"
        />
        {isEvent ? (
          <View style={styles.eventTag}>
            <Image
              source={require('../assets/map/brush.png')}
              style={styles.tagImage}
            />
            <Text style={styles.eventTagText}>{tag.toLowerCase()}</Text>
          </View>
        ) : (
          <View style={styles.resourceTag}>
            <Image
              source={tagIcon}
              style={styles.tagImage}
            />
            <Text style={styles.resourceTagText}>{tag.toLowerCase()}</Text>
          </View>
        )}
      </View>
      <View style={styles.textContent}>
        {isEvent && <Text style={styles.organization}>{organization}</Text>}
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.row}>
          <Image
            source={require('../assets/map/calendar.png')}
            style={styles.infoIcon}
          />
           {isEvent && <Text style={styles.infoText} >{eventDay}, {startTime} - {endTime}</Text>}
           {/* {!isEvent && daysOfWeek.map((day)=>(<Text style={styles.infoText}>{day}, {startTime}-{endTime}</Text>))} */}
           {!isEvent && <Text style={styles.infoText} numberOfLines={1}>{daysOfWeek[0]}, {startTime} - {endTime}</Text>}
        </View>
        <View style={styles.row}>
          <Image
            source={require('../assets/map/location.png')}
            style={styles.infoIcon}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <Text style={styles.infoText}>
              {location?.address ?? 'No address available'}
            </Text>
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity style={styles.detailsButton} onPress={onPressEvent}>
        <Text style={styles.detailsButtonText}>
          More Details
          {'  >'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

MapCard.propTypes = {
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
  description: PropTypes.string,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  tag: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  organization: PropTypes.string,
  recurringMonthly: PropTypes.bool.isRequired,
  recurringWeekly: PropTypes.bool.isRequired,
  website: PropTypes.string,
  resourceType: PropTypes.string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  isEvent: PropTypes.bool.isRequired,
};

// MapCard.defaultProps = {
//   image: '',
//   description: '',
//   tag: 'tagPlaceholder',
//   organization: 'organizationPlaceholder',
// };

export default MapCard;
