import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, Dimensions,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import { Card } from 'react-native-paper';
import PropTypes from 'prop-types';

const cardGap = 17;

const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;

const styles = StyleSheet.create({
  savedCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  savedResourceCard: {
    marginTop: cardGap,
    width: cardWidth,
    borderRadius: 15,
    borderColor: '#CD7F3D',
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
});

function SavedResourcesScreen() {
  const [loadAllResources, setLoadAllResources] = useState(false);
  const [loadSavedResource, setLoadSavedResource] = useState(false);
  const [savedResource, setSavedResource] = useState([]);
  const [allResources, setAllResources] = useState([]);

  const findResource = (eventID) => {
    const eventInfo = {
      tag: 'No Tag',
      resourceName: 'No Name',
    };
    if (loadAllResources) {
      allResources.forEach((resourceDetail) => {
        if (resourceDetail.ResourceData._id === eventID) {
          eventInfo.tag = (resourceDetail.ResourceData.tag);
          eventInfo.eventName = (resourceDetail.ResourceData.title);
        }
      });
    }
    return eventInfo;
  };

  const getSavedResource = async () => {
    try {
      setLoadSavedResource(false);
      const res = await axios.get(`${URL}/user/getResources/63e33e2f578ad1d80bd2a347`);
      setSavedResource(res.data.msg[0].savedResources.slice(0, 2));
      return res;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadSavedResource(true);
    }
  };

  const getAllResources = async () => {
    try {
      setLoadAllResources(false);
      const result = await axios.get(`${URL}/resource/get`);
      setAllResources(result.data);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadAllResources(true);
    }
  };

  useEffect(() => {
    getSavedResource();
    getAllResources();
  }, []);

  // Display and edit profile info
  return (
    <ScrollView>
      <View style={styles.savedCardContainer}>
        {
        loadSavedResource ? (
          savedResource.map((oneResource) => (
            <Card style={styles.savedResourceCard}>
              <Card.Content>
                <Text style={styles.savedCategoryTitle}>
                  {findResource(oneResource).tag}
                </Text>
                <Text style={styles.savedTitle}>
                  {findResource(oneResource).eventName}
                </Text>
              </Card.Content>
            </Card>
          ))
        ) : <Text>There is no saved art</Text>
      }
      </View>
    </ScrollView>
  );
}

SavedResourcesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default SavedResourcesScreen;
