import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Image, Switch, TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { URL } from '@env';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import AddCalendarButton from '../Components/AddCalendarButton';

const MAX_LINES = 3;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    paddingBottom: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalText: {
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: '#1E2021',
    lineHeight: 23.2,
  },
  flexContainer: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    marginTop: 10,
    width: '50%',
    height: 45,
    borderColor: '#424288',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    width: '100%',
    height: '15%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F8F8F8',
    marginTop: 80,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  overlayContent: {
    flex: 1,
    marginTop: 100,
    marginHorizontal: 10,
  },
  title: {
    width: '80%',
    fontFamily: 'MontserratMedium',
    fontSize: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
    fontFamily: 'MontserratMedium',
    fontSize: 20,
  },
  organizationContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F6',
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 35,
    alignItems: 'center',
  },
  organizationText: {
    fontFamily: 'MontserratMedium',
    fontSize: 16,
    color: '#424288',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  organizationInfoIcon: {
    width: 20,
    height: 20,
  },
  info: {
    backgroundColor: '#EFEFF5',
    borderWidth: 0.5,
    borderColor: '#D0D0E8',
    borderRadius: 5,
    padding: 20,
  },
  infoIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    resizeMode: 'contain',
  },
  infoIconTransparent: {
    marginRight: 15,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  saveIcon: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
  },
  arrowIcon: {
    width: 10,
    height: 13,
    resizeMode: 'contain',
    marginLeft: 15,
  },
  readMore: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 14,
    lineHeight: 20.3,
    color: '#1E2021',
  },
  infoText: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 16,
    color: '#4C4C9B',
  },
  infoImage: {
    width: 20,
    height: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  lastRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  frequency: {
    backgroundColor: '#D0D0E8',
    borderRadius: 60,
    paddingVertical: 5,
    paddingHorizontal: 9,
    marginLeft: 15,
  },
  frequencyText: {
    fontFamily: 'MontserratMedium',
    fontSize: 12,
    color: '#4C4C9B',
  },
  heading: {
    fontFamily: 'MontserratMedium',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  description: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    lineHeight: 20,
  },
});

function EventDetailScreen({
  navigation, route,
}) {
  const {
    id,
    image,
    startTime,
    endTime,
    day,
    week,
    location,
    title,
    description,
    startDate,
    organization,
    recurringMonthly,
    recurringWeekly,
  } = route.params || {};

  const organizations = [
    {
      title: 'Los Angeles Poverty Department',
      image: require('../assets/orgPics/lapd.png'),
      description: 'Founded in 1985 by director-performer-activist John Malpede, Los Angeles Poverty Department (LAPD)is a non-profit arts organization, the first performance group in the nation made up principally of homeless people, and the first arts program of any kind for homeless people in Los Angeles. LAPD creates performances and multidisciplinary artworks that connect the experience of people living in poverty to the social forces that shape their lives and communities. LAPD’s works express the realities, hopes, dreams and rights of people who live and work in L.A.’s Skid Row.',
      phoneNumber: '(213) 413-1077',
      email: 'info@lapovertydept.org',
      website: 'www.lapovertydept.org',
    },
    {
      title: 'Piece by Piece',
      image: require('../assets/orgPics/piecebypiece.png'),
      description: 'Our mission is to empower residents who have experienced homelessness or economic insecurity by providing free mosaic art workshops enabling them to build confidence, earn supplementary income, promote wellness and an improved quality of life.',
      phoneNumber: '(213) 459-1420',
      email: 'info@piecebypiece.org',
      website: 'https://www.piecebypiece.org',
    },
    {
      title: 'Street Symphony',
      image: require('../assets/orgPics/streetsymphony.png'),
      description: 'Connection through music. Street Symphony engages communities directly affected by homelessness and incarceration in LA County through performances, workshops and teaching artistry.',
      phoneNumber: '(213) 222-6221',
      email: 'contact@streetsymphony.org',
      website: 'www.streetsymphony.org',
    },
    {
      title: 'Urban Voices Project',
      image: require('../assets/orgPics/urbanvoices.png'),
      description: 'Urban Voices Project uses music to create supportive community spaces in Skid Row and the Los Angeles area that bridge vulnerable individuals to a sense of purpose and improved health.',
      phoneNumber: '(714) 606-4818',
      email: 'info@urbanvoicesproject.org',
      website: 'urbanvoicesproject.org',
    },
  ];

  const selectedOrganization = organizations.find((org) => org.title === organization);
  const [isEventSaved, setIsEventSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });

  const getSavedEvents = async () => {
    try {
      const res = await axios.get(`${URL}/user/getEvents/${id}`, {
        headers: authHeader,
      });
      if ((res.data.msg[0].savedEvents.find((elem) => elem === eventId.toString())) === undefined) {
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    getSavedEvents().then((status) => setIsEventSaved(status));
  }, []);

  const addSavedEvent = async () => {
    try {
      const res = await axios.patch(`${URL}/user/addEvent/${id}`, [eventId], {
        headers: authHeader,
      });
      setIsEventSaved(true);
      return res;
    } catch (err) {
      return err;
    }
  };

  const removeSavedEvent = async () => {
    try {
      const res = await axios.patch(`${URL}/user/removeEvent/${id}`, [eventId], {
        headers: authHeader,
      });
      setIsEventSaved(false);
      return res;
    } catch (err) {
      return err;
    }
  };

  const onPressOrganization = () => {
    navigation.navigate('Organization Details', {
      selectedOrganization,
    });
  };

  const onPressToggleSavedEvent = () => {
    if (isEventSaved) {
      removeSavedEvent();
    } else {
      addSavedEvent();
    }
  };

  // TO DO: add 'first' tuesdays, etc.
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[day];
  const weeksOfMonth = ['First', 'Second', 'Third', 'Fourth'];
  const weekOfMonth = weeksOfMonth[week - 1];

  const saveIcon = isEventSaved ? require('../assets/detailScreen/saved.png') : require('../assets/detailScreen/unsaved.png');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={image}
        style={styles.coverImage}
      />
      <View style={styles.overlay} />
      <ScrollView style={styles.overlayContent} showsVerticalScrollIndicator={false}>
        <View style={styles.flexContainer}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={[{ paddingTop: 5 }, { marginLeft: 45} ]} onPress={onPressToggleSavedEvent}>
            <Image style={styles.saveIcon} source={saveIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.organizationContainer} onPress={() => onPressOrganization()}>
          <Text style={styles.organizationText}>{organization}</Text>
          <Image source={require('../assets/detailScreen/info.png')} style={styles.infoImage} />
        </TouchableOpacity>
        <ScrollView style={styles.info}>
          <View style={styles.infoRow}>
            <Image source={require('../assets/detailScreen/calendarIcon.png')} style={styles.infoIcon} />
            {recurringMonthly && <Text style={styles.infoText}>{weekOfMonth} {dayOfWeek}{'s'}</Text>}
            {!recurringMonthly && <Text style={styles.infoText}>{dayOfWeek}</Text>}
            <View style={styles.frequency}>
              {recurringMonthly && <Text style={styles.frequencyText}>Monthly</Text>}
              {recurringWeekly && <Text style={styles.frequencyText}>Weekly</Text>}
              {!recurringMonthly && !recurringWeekly && <Text style={styles.frequencyText}>Does not Repeat</Text>}
            </View>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../assets/detailScreen/clockIcon.png')} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {startTime}{' '}-{' '}{endTime}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../assets/detailScreen/markerIcon.png')} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {location.address}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../assets/detailScreen/phoneIcon.png')} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {selectedOrganization.phoneNumber}
            </Text>
          </View>
          <View style={styles.lastRow}>
            <Image source={require('../assets/detailScreen/websiteIcon.png')} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {selectedOrganization.website}
            </Text>
          </View>
          <AddCalendarButton
            eventName={title}
            eventStartDate={startDate}
            // eventEndDate={endDate}
          />
        </ScrollView>
        <Text style={styles.header}>
          Event Description
        </Text>
        <Text style={styles.normalText} numberOfLines={showFullDescription ? undefined : MAX_LINES} ellipsizeMode="tail"> {description} </Text>
        {description?.length > MAX_LINES && (
          <TouchableOpacity onPress={toggleShowFullDescription}>
            <Text style={styles.readMore}>
              {showFullDescription ? 'Read less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={styles.header}>
          More About the Organization
        </Text>
        <Text style={styles.normalText}>
          {selectedOrganization.description}
        </Text>
        <View>
          <View style={[styles.flexContainer, {marginTop: 10}]}>
            <Image source={require('../assets/detailScreen/callTransparent.png')} style={styles.infoIconTransparent} />
            <Text style={styles.normalText}>
              {selectedOrganization.phoneNumber}
            </Text>
          </View>
          <View style={styles.flexContainer}>
            <Image source={require('../assets/detailScreen/mailTransparent.png')} style={styles.infoIconTransparent} />
            <Text style={styles.normalText}>
              {selectedOrganization.email}
            </Text>
          </View>
          <View style={[styles.flexContainer, {marginBottom: 10}]}>
            <Image source={require('../assets/detailScreen/globeTransparent.png')} style={styles.infoIconTransparent} />
            <Text style={styles.normalText}>
              {selectedOrganization.website}
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => onPressOrganization()}>
            <Text style={styles.infoText}>
              Learn More
            </Text>
            <Image style={styles.arrowIcon} source={require('../assets/detailScreen/arrowTransparent.png')}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

EventDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      key: PropTypes.string,
      id: PropTypes.string.isRequired,
      image: PropTypes.number.isRequired,
      title: PropTypes.string,
      location: PropTypes.shape({
        name: PropTypes.string,
        address: PropTypes.string,
        specialinstructions: PropTypes.string,
        coordinates: PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      }),
      description: PropTypes.string,
      startDate: PropTypes.instanceOf(Date),
      endDate: PropTypes.instanceOf(Date),
      tag: PropTypes.string,
      phoneNumber: PropTypes.string,
      organization: PropTypes.string,
      recurringMonthly: PropTypes.bool,
      recurringWeekly: PropTypes.bool,
      website: PropTypes.string,
      organizationDescription: PropTypes.string,
    }),
  }).isRequired,
};

export default EventDetailScreen;
