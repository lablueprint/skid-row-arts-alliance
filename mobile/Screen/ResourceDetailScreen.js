import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Image, TouchableOpacity,
} from 'react-native';
import { URL } from '@env';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

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

function ResourceDetailScreen({
  route,
}) {
  const {
    startTime,
    endTime,
    days,
    location,
    title,
    phoneNumber,
    email,
    website,
    image,
  } = route.params || {};

  // const [isEventSaved, setIsEventSaved] = useState(false);
  // const [showFullDescription, setShowFullDescription] = useState(false);
  // const toggleShowFullDescription = () => {
  //   setShowFullDescription(!showFullDescription);
  // };
  let [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });

  // const getSavedEvents = async () => {
  //   try {
  //     const res = await axios.get(`${URL}/user/getEvents/${id}`, {
  //       headers: authHeader,
  //     });
  //     if ((res.data.msg[0].savedEvents.find((elem) => elem === eventId.toString())) === undefined) {
  //       return false;
  //     }
  //     return true;
  //   } catch (err) {
  //     console.error(err);
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   getSavedEvents().then((status) => setIsEventSaved(status));
  // }, []);

  // const addSavedEvent = async () => {
  //   try {
  //     const res = await axios.patch(`${URL}/user/addEvent/${id}`, [eventId], {
  //       headers: authHeader,
  //     });
  //     setIsEventSaved(true);
  //     return res;
  //   } catch (err) {
  //     return err;
  //   }
  // };

  // const removeSavedEvent = async () => {
  //   try {
  //     const res = await axios.patch(`${URL}/user/removeEvent/${id}`, [eventId], {
  //       headers: authHeader,
  //     });
  //     setIsEventSaved(false);
  //     return res;
  //   } catch (err) {
  //     return err;
  //   }
  // };

  // const onPressToggleSavedEvent = () => {
  //   if (isEventSaved) {
  //     removeSavedEvent();
  //   } else {
  //     addSavedEvent();
  //   }
  // };

  // const saveIcon = isEventSaved ? require('../assets/detailScreen/saved.png') : require('../assets/detailScreen/unsaved.png');

  const formatConsecutiveDays = (weekdays) => {
    weekdays.sort(); // Sort the days in ascending order
    const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const daysOfWeek = [];
    let rangeStart = weekdays[0];
    for (let i = 1; i <= weekdays.length; i += 1) {
      if (i === weekdays.length || weekdays[i] !== weekdays[i - 1] + 1) {
        if (i - rangeStart >= 3) {
          daysOfWeek.push(`${weekdayNames[rangeStart]}-${weekdayNames[weekdays[i - 1]]}`);
        } else {
          daysOfWeek.push(...Array.from({ length: i - rangeStart }, (_, j) => weekdayNames[rangeStart + j]));
        }
        rangeStart = weekdays[i];
      }
    }
    return daysOfWeek;
  };
  const daysOfWeek = formatConsecutiveDays(days);

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
        <ScrollView style={styles.info}>
          <View style={styles.infoRow}>
            <Image source={require('../assets/detailScreen/clockIcon.png')} style={styles.infoIcon} />
            {daysOfWeek.map((day) => (
              <Text style={styles.infoText} key={day}>
                {day}, {startTime} - {endTime}
              </Text>
            ))}
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
        </ScrollView>
        <Text style={styles.header}>
          Information
        </Text>
        {daysOfWeek.map((day) => (
          <Text style={styles.infoText} key={day}>
            {day}, {startTime} - {endTime}
          </Text>
        ))}
        <Text style={styles.header}>
          Contact Info
        </Text>
        <View>
          <View style={[styles.flexContainer, {marginTop: 10}]}>
            <Image source={require('../assets/detailScreen/callTransparent.png')} style={styles.infoIconTransparent} />
            <Text style={styles.normalText}>
              {phoneNumber}
            </Text>
          </View>
          <View style={styles.flexContainer}>
            <Image source={require('../assets/detailScreen/mailTransparent.png')} style={styles.infoIconTransparent} />
            <Text style={styles.normalText}>
              {email}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

ResourceDetailScreen.propTypes = {
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
      tag: PropTypes.string,
      phoneNumber: PropTypes.string,
      organization: PropTypes.string,
      recurringMonthly: PropTypes.bool,
      recurringWeekly: PropTypes.bool,
      website: PropTypes.string,
    }),
  }).isRequired,
};

export default ResourceDetailScreen;
