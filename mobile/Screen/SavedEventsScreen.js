import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, Dimensions,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import { Card } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const cardGap = 17;
const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;

const styles = StyleSheet.create({
  savedEventCard: {
    marginTop: cardGap,
    width: cardWidth,
    borderRadius: 15,
    borderColor: '#D26090',
    borderLeftWidth: 15,
    borderWidth: 1,
    marginLeft: 10,
  },
  savedTitle: {
    fontSize: 16,
    color: '#1E2021',
  },
  savedCategoryTitle: {
    fontSize: 14,
    color: '#1E2021',
    paddingBottom: 5,
  },
  savedEventCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

function SavedEventsScreen() {
  const [allEvents, setAllEvents] = useState([]);
  const [loadAllEvent, setLoadAllEvent] = useState(false);
  const [loadSavedEvent, setLoadSavedEvent] = useState(false);
  const [savedEvent, setSavedEvent] = useState([]);

  const { id, authHeader } = useSelector((state) => state.auth);

  const findEvent = (eventID) => {
    const eventInfo = {
      tag: 'No Tag',
      eventName: 'No Name',
    };
    if (loadAllEvent) {
      allEvents.forEach((eventDetail) => {
        if (eventDetail.EventData._id === eventID) {
          eventInfo.tag = (eventDetail.EventData.tag);
          eventInfo.eventName = (eventDetail.EventData.title);
        }
      });
    }
    return eventInfo;
  };

  const getSavedEvent = async () => {
    try {
      setLoadSavedEvent(false);
      const res = await axios.get(`${URL}/user/getEvents/${id}`, {
        headers: authHeader,
      });
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
      const result = await axios.get(`${URL}/event/get`, {
        headers: authHeader,
      });
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
      <View style={styles.savedEventCardContainer}>
        {
        loadSavedEvent ? (
          savedEvent.map((oneEvent) => (
            <Card style={styles.savedEventCard}>
              <Card.Content>
                <Text style={styles.savedCategoryTitle}>
                  {findEvent(oneEvent).tag}
                </Text>
                <Text style={styles.savedTitle}>
                  {findEvent(oneEvent).eventName}
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
