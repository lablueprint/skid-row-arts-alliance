import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Image, Switch, TouchableOpacity,
} from 'react-native';
import { URL } from '@env';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import AddCalendarButton from '../Components/AddCalendarButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalText: {
    fontSize: 16,
    fontFamily: 'MontserratMedium',
    color: '#1E2021',
    lineHeight: 23,
  },
  flexContainer: {
    flexDirection: 'row',
  },
  button: {
    marginTop: 10,
    width: 350,
    height: 50,
    borderColor: '#424288',
    borderWidth: 2,
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
  },
  image: {
    width: '100%',
    height: '15%',
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
    fontFamily: 'MontserratMedium',
    fontSize: 24,
  },
  header: {
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
    width: 20,
    height: 20,
    resizeMode: 'contain',
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
    email,
    website,
    eventDescription,
    organizationDescription,
  } = route.params;

  const [isEventSaved, setIsEventSaved] = useState(false);

  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });

  const getSomeEvents = async () => {
    try {
      const res = await axios.get(`${URL}/user/getEvents/63e33e2f578ad1d80bd2a347`);
      if ((res.data.msg[0].savedEvents.find((elem) => elem === id.toString())) === undefined) {
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    getSomeEvents().then((status) => setIsEventSaved(status));
  }, []);

  const addSavedEvent = async (eventId) => {
    try {
      const res = await axios.patch(`${URL}/user/addEvent/63e33e2f578ad1d80bd2a347`, [eventId]);
      setIsEventSaved(true);
      return res;
    } catch (err) {
      return err;
    }
  };

  const removeSavedEvent = async (eventId) => {
    try {
      const res = await axios.patch(`${URL}/user/removeEvent/63e33e2f578ad1d80bd2a347`, [eventId]);
      setIsEventSaved(false);
      return res;
    } catch (err) {
      return err;
    }
  };

  const onPressOrganization = () => {
    navigation.navigate('Organization Details', {
      image,
      organization,
      organizationDescription,
      phoneNumber,
      email,
      website,
    });
  };

  const onPressToggleSavedEvent = () => {
    if (isEventSaved) {
      removeSavedEvent(id);
    } else {
      addSavedEvent(id);
    }
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

  const imageURL = image.uri;

  const startTime = formatTime(new Date(startDate));
  const endTime = formatTime(new Date(endDate));

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[startDate.getDay()];

  console.log(`String: ${imageURL}`);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Image
          source={{ uri: imageURL }}
          style={styles.image}
        />
      </View>
      <View style={styles.overlay} />
      <ScrollView style={styles.overlayContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.organizationContainer}>
          <Text style={styles.organizationText}>{organization}</Text>
          <Image source={require('../assets/detailScreen/info.png')} style={styles.infoImage} />
        </TouchableOpacity>
        <ScrollView style={styles.info}>
          <View style={styles.infoRow}>
            <Image source={require('../assets/detailScreen/calendarIcon.png')} style={styles.infoIcon} />
            <Text style={styles.infoText}>{dayOfWeek}</Text>
            <View style={styles.frequency}>
              {recurringMonthly && <Text style={styles.frequencyText}>Monthly</Text>}
              {recurringWeekly && <Text style={styles.frequencyText}>Weekly</Text>}
            </View>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../assets/detailScreen/clockIcon.png')} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {startTime}
              -
              {endTime}
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
              {phoneNumber}
            </Text>
          </View>
          <View style={styles.lastRow}>
            <Image source={require('../assets/detailScreen/websiteIcon.png')} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {website}
            </Text>
          </View>
          <AddCalendarButton
            eventName={title}
            eventStartDate={startDate}
            eventEndDate={endDate}
          />
        </ScrollView>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.infoText}>
            Add To Calendar
          </Text>
        </TouchableOpacity>
        <Text style={styles.header}>
          Pictures
        </Text>
        <Image source={require('../assets/detailScreen/laPoverty.png')} style={styles.image}/>
        <Text style={styles.header}>
          Event Description
        </Text>
        <Text style={styles.normalText}>
          We create theater performances
        </Text>
        <Text style={styles.header}>
          More About the Organization
        </Text>
        <Text style={styles.normalText}>
          {organizationDescription}
        </Text>
        <View>
          <View style={styles.flexContainer}>
            <Image source={require('../assets/detailScreen/callTransparent.png')} style={styles.infoIconTransparent} />
            <Text style={styles.normalText}>
              {phoneNumber}
            </Text>
          </View>
          <View style={styles.flexContainer}>
            <Image source={require('../assets/detailScreen/mailTransparent.png')} style={styles.infoIconTransparent} />
            <Text style={styles.normalText}>
              studio526@gmail.com
            </Text>
          </View>
          <View style={styles.flexContainer}>
            <Image source={require('../assets/detailScreen/globeTransparent.png')} style={styles.infoIconTransparent} />
            <Text style={styles.normalText}>
              {website}
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => onPressOrganization()}>
            <Text style={styles.infoText}>
              Learn More
            </Text>
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
      image: PropTypes.string,
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
