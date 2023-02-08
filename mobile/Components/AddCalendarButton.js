import React, { useState, useEffect } from 'react';
import {
  StyleSheet, TouchableOpacity, Text, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import * as Calendar from 'expo-calendar';

const styles = StyleSheet.create({
  calendarButton: {
    backgroundColor: '#4C4C9B',
    marginTop: 10,
    padding: 8,
    borderRadius: 5,
  },
  calendarButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

function AddToCalendarButton({ eventName, eventStartDate, eventEndDate }) {
  const [calendarPermission, setCalendarPermission] = useState(null);

  const requestCalendarPermissions = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    setCalendarPermission(status);
  };
  useEffect(() => {
    requestCalendarPermissions();
  }, []);

  const handlePress = async () => {
    if (calendarPermission === 'granted') {
      try {
        const calendars = await Calendar.getCalendarsAsync();
        if (calendars.length > 0) {
          const defaultCalendar = calendars[0];
          const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
            title: eventName,
            startDate: eventStartDate,
            endDate: eventEndDate,
          });
          Calendar.openEventInCalendar(eventId);
          if (!eventId) {
            Alert.alert('Failed to create event');
          }
        } else {
          Alert.alert('No calendars found');
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    } else {
      Alert.alert('Calendar permission not granted');
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.calendarButton}>
      <Text style={styles.calendarButtonText}>Add to Calendar</Text>
    </TouchableOpacity>
  );
}

AddToCalendarButton.propTypes = {
  eventName: PropTypes.string.isRequired,
  eventStartDate: PropTypes.instanceOf(Date).isRequired,
  eventEndDate: PropTypes.instanceOf(Date).isRequired,
};

export default AddToCalendarButton;
