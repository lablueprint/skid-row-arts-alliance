import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import PropTypes from 'prop-types';
import CalendarPicker from 'react-native-calendar-picker';
import { useFonts, Montserrat_400Regular,  Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import EventCard from '../Components/EventCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: '#DDDDDD',
    borderRadius: 4,
    margin: 20,
    padding: 5,
  },
});

function EventScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
    MontserratMedium: Montserrat_500Medium,
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const eventThumbnails = {
    'art & community': require('../assets/eventThumbnails/artCommunity.png'),
    exhibit: require('../assets/eventThumbnails/exhibit.png'),
    film: require('../assets/eventThumbnails/film.png'),
    music: require('../assets/eventThumbnails/music.png'),
    performance: require('../assets/eventThumbnails/performance.png'),
    'spoken word': require('../assets/eventThumbnails/spokenWord.png'),
    miscellaneous: require('../assets/eventThumbnails/miscellaneous.png'),
    'visual art': require('../assets/eventThumbnails/visualArt.png'),
  };

  const getAllEvents = async () => {
    try {
      const result = await axios.get(`${URL}/event/get`);
      setAllEvents(result.data);
      setFilteredEvents(result.data);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const handleButtonPress = () => {
    setShowCalendar(!showCalendar);
  };

  const weekNum = (date, weekday) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    let count = 0;
    for (let day = firstDay; day <= date; day.setDate(day.getDate() + 1)) {
      if (day.getDay() === weekday) {
        count += 1;
      }
    }
    console.log(count);
    return count;
  };

  // the way the calendar works is you have to double click it to select another date
  const filterEvents = (date) => {
    if (!date) {
      setFilteredEvents(allEvents);
    } else {
      const inputDate = new Date(date);
      inputDate.setHours(17, 0, 0);
      const filtered = allEvents.filter((event) => {
        const eventDate = new Date(event.EventData.dateDetails.date);
        const dayOfWeek = event.EventData.dateDetails.day;
        const rec = event.EventData.dateDetails.recurring;
        const weekOfMonth = event.EventData.dateDetails.week;

        if (rec === 'Weekly') {
          return (inputDate >= eventDate && inputDate.getDay() === dayOfWeek);
        }
        if (rec === 'Monthly') {
          return (inputDate >= eventDate && inputDate.getDay() === dayOfWeek && weekNum(inputDate, dayOfWeek) === weekOfMonth)
        }
        return (inputDate.getTime() === eventDate.getTime());
      });
      setFilteredEvents(filtered);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    filterEvents(date);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.buttonContainer}>
        <Button
          title="Select date"
          color="#4C4C9B"
          accessibilityLabel="Go to date picker"
          onPress={handleButtonPress}
        />
      </View>
      {showCalendar && (
        <CalendarPicker
          onDateChange={handleDateSelect}
          selectedStartDate={selectedDate}
          selectedEndDate={selectedDate}
          selectedDayColor="#7373BA"
          selectedDayTextColor="white"
          textStyle={{
            fontFamily: 'MontserratSemiBold',
          }}
          todayBackgroundColor="#D0D0E8"
          todayTextStyle={{ color: '#424288', fontFamily: 'MontserratBold' }}
          previousTitle="<"
          previousTitleStyle={{ fontSize: 20 }}
          nextTitle=">"
          nextTitleStyle={{ fontSize: 20 }}
        />
      )}
      {selectedDate !== null && (
        <Text style={{ textAlign: 'center' }}>
          Date selected:
          {' '}
          {JSON.stringify(selectedDate).slice(1, 11)}
        </Text>
      )}
      {filteredEvents.map((event) => (
        <EventCard
          key={event.EventData._id}
          id={event.EventData._id}
          startTime={event.EventData.dateDetails.startTime}
          endTime={event.EventData.dateDetails.endTime}
          day={event.EventData.dateDetails.day}
          week={event.EventData.dateDetails.week}
          image={eventThumbnails[event.EventData.tag]}
          title={event.EventData.title}
          location={event.EventData.locationDetails}
          description={event.EventData.description}
          startDate={new Date(event.EventData.dateDetails.date)}
          tag={event.EventData.tag}
          organization={event.EventData.host}
          recurringMonthly={event.EventData.dateDetails.recurring === 'Monthly'}
          recurringWeekly={event.EventData.dateDetails.recurring === 'Weekly'}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
}

EventScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default EventScreen;
