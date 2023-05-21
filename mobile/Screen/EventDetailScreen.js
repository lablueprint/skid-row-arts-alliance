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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '15%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
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
  organizationContainer: {
    backgroundColor: '#F2F2F6',
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 35,
  },
  organizationText: {
    fontFamily: 'MontserratMedium',
    fontSize: 16,
    color: '#424288',
    marginHorizontal: 10,
    marginVertical: 3,
  },
});

function EventDetailScreen({
  navigation, route,
}) {
  const {
    key,
    id,
    image,
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

  const onPressEvent = () => {
    navigation.navigate('Organization Details', {
      organizations,
      summary,
      number,
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

  const startTime = formatTime(new Date(startDate));
  const endTime = formatTime(new Date(endDate));

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image.uri }}
        style={styles.image}
      />
      <View style={styles.overlay} />
      <View style={styles.overlayContent}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.organizationContainer}>
          <Text style={styles.organizationText}>{organization}</Text>
        </TouchableOpacity>
        <View style={styles.info}>
          <View style={styles.weekday}>
            <Text>todo</Text>
            {recurringMonthly && <Text>Monthly</Text>}
            {recurringWeekly && <Text>Weekly</Text>}
          </View>
        </View>
        <Text>
          Description:
          {description}
        </Text>
        {/* <Text>
          Time:
          {startTime}
          -
          {endTime}
        </Text> */}
        <Text>
          Tag:
          {tag}
        </Text>
        <Text>
          Phone Number:
          {phoneNumber}
        </Text>
        <Text>
          Organization:
          {organization}
        </Text>
        {/* {recurringMonthly}
        ??
        <Text>
          Monthly
        </Text>
        :
        <Text>
          Weekly
        </Text> */}
        <Text>
          Website:
          {website}
        </Text>
        <Text>
          Organization Description:
          {organizationDescription}
        </Text>
      </View>
    </View>
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
      image: PropTypes.shape(),
      title: PropTypes.string,
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
