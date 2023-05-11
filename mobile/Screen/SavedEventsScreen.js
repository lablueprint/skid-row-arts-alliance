import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import { Card } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  savedEventCard: {
    paddingBottom: 10,
    borderRadius: 15,
    borderColor: '#D26090',
    borderLeftWidth: 15,
    borderWidth: 2,
  },
  savedTitle: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: '#1E2021',
  },
  savedCategoryTitle: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: '#1E2021',
  },
});

function SavedEventsScreen() {
  const [allEvents, setAllEvents] = useState([]);
  const [loadAllEvent, setLoadAllEvent] = useState(false);
  const [loadSavedEvent, setLoadSavedEvent] = useState(false);
  const [savedEvent, setSavedEvent] = useState([]);

  const findEvent = (eventName) => {
    let tag = 'No Tag';
    if (loadAllEvent) {
      allEvents.forEach((eventDetail) => {
        if (eventDetail.EventData.title === eventName) {
          tag = (eventDetail.EventData.tag);
        }
      });
    }
    return tag;
  };

  const getSavedEvent = async () => {
    try {
      setLoadSavedEvent(false);
      const res = await axios.get(`${URL}/user/getEvents/63e33e2f578ad1d80bd2a347`);
      setSavedEvent(res.data.msg[0].savedEvents);
      return res;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadSavedEvent(true);
    }
  };

  const getAllEvents = async () => {
    try {
      setLoadAllEvent(false);
      const result = await axios.get(`${URL}/event/get`);
      setAllEvents(result.data);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadAllEvent(true);
    }
  };

  useEffect(() => {
    getSavedEvent();
    getAllEvents();
  }, []);

  // Display and edit profile info
  return (
    <ScrollView>
      <View>
        {
        loadSavedEvent ? (
          savedEvent.map((oneEvent) => (
            <Card>
              <Card.Content style={styles.savedEventCard}>
                <Text style={styles.savedCategoryTitle}>
                  {findEvent(oneEvent)}
                </Text>
                <Text style={styles.savedTitle}>
                  {oneEvent}
                </Text>
              </Card.Content>
            </Card>
          ))
        ) : <Text>There is no saved events</Text>
      }
      </View>
    </ScrollView>
  );
}

SavedEventsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default SavedEventsScreen;
