import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import { Card } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    color: '#1E2021',
    fontWeight: '700',
  },
  savedTitle: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: '#1E2021',
  },
});

function SavedEventsScreen() {
  const [loadSavedEvent, setLoadSavedEvent] = useState(false);
  const [savedEvent, setSavedEvent] = useState([]);

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

  useEffect(() => {
    getSavedEvent();
  }, []);

  // Display and edit profile info
  return (
    <ScrollView>
      <View>
        <Text style={styles.heading}>
          Events
        </Text>
        {
          loadSavedEvent ? (
            savedEvent.map((oneEvent) => (
              <Card>
                <Card.Content>
                  <Text style={styles.savedTitle}>
                    {oneEvent}
                  </Text>
                </Card.Content>
              </Card>
            ))
          ) : <Text>There is no saved event</Text>
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
