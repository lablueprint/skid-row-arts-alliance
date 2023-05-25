/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { URL } from '@env';
import axios from 'axios';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import {
  StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';
import PropTypes from 'prop-types';

const cardGap = 15;

const cardWidth = 170;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
    paddingTop: 5,
  },
  savedContainer: {
    paddingBottom: 30,
  },
  savedHeadingAndSeeAll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
  savedCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  savedEventCard: {
    marginTop: cardGap,
    width: cardWidth,
    borderRadius: 15,
    borderColor: '#D26090',
    borderLeftWidth: 15,
    borderWidth: 1,
    marginLeft: 10,
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
  savedArtCard: {
    borderRadius: 15,
    borderWidth: 1,
    marginVertical: 10,
  },
  savedArtCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  heading: {
    fontSize: 20,
    color: '#1E2021',
    paddingTop: 10,
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
  seeAllSavedButton: {
    backgroundColor: 'transparent',
    marginLeft: 10,
  },
  seeAllText: {
    fontSize: 14,
    color: '#424288',
    paddingTop: 15,
    marginRight: 40,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarHandleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  handleContainer: {
    flex: 1,
  },
  handleText: {
    marginBottom: 10,
  },
  nameAndEditButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 0,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  name: {
    marginRight: 5,
    fontSize: 20,
    fontFamily: 'Montserrat',
  },
});

function ProfileScreen({ navigation }) {
  const [loadSavedArt, setLoadSavedArt] = useState(false);
  const [savedArt, setSavedArt] = useState([]);
  const [loadAllEvent, setLoadAllEvent] = useState(false);
  const [loadSavedEvent, setLoadSavedEvent] = useState(false);
  const [savedEvent, setSavedEvent] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loadAllThumnails, setLoadAllThumbnails] = useState(false);
  const [allThumbnails, setAllThumbnails] = useState([]);

  const [loadAllResources, setLoadAllResources] = useState(false);
  const [loadSavedResource, setLoadSavedResource] = useState(false);
  const [savedResource, setSavedResource] = useState([]);
  const [allResources, setAllResources] = useState([]);

  const [currFirstName, setFirstName] = useState('');
  const [currLastName, setLastName] = useState('');

  const [currBio, setBio] = useState('');

  const [currFacebook, setFacebook] = useState('');
  const [currInstagram, setInstagram] = useState('');
  const [currTwitter, setTwitter] = useState('');

  const [showBio, setShowBio] = useState(true);

  const getUserData = async () => {
    try {
      const res = await axios.get(`${URL}/user/getUser/63e33e2f578ad1d80bd2a347`);
      console.log(res.data.msg);
      setFirstName(res.data.msg.firstName);
      setLastName(res.data.msg.lastName);
      setBio(res.data.msg.bio);
      setFacebook(res.data.msg.socialMedia.facebook);
      setInstagram(res.data.msg.socialMedia.instagram);
      setTwitter(res.data.msg.socialMedia.twitter);
      setBio(res.data.msg.bio);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

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

  const findThumbnail = (artID) => {
    const artInfo = {
      thumbNail: 'No Tag',
    };
    if (loadAllThumnails) {
      allThumbnails.forEach((thumbnail) => {
        if (thumbnail.SubmissionId === artID) {
          artInfo.thumbNail = (thumbnail.ImageURL);
        }
      });
    }
    return artInfo.thumbNail;
  };

  const getSavedArtwork = async () => {
    try {
      setLoadSavedArt(false);
      const res = await axios.get(`${URL}/user/getArtwork/63e33e2f578ad1d80bd2a347`);
      setSavedArt(res.data.msg[0].savedArtwork.slice(0, 2));
      return res;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadSavedArt(true);
    }
  };

  const getSavedEvent = async () => {
    try {
      setLoadSavedEvent(false);
      const res = await axios.get(`${URL}/user/getEvents/63e33e2f578ad1d80bd2a347`);
      setSavedEvent(res.data.msg[0].savedEvents.slice(0, 2));
      return res;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadSavedEvent(true);
    }
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

  const getThumbnails = async () => {
    try {
      setLoadAllThumbnails(false);
      const result = await axios.get(`${URL}/submissions/getthumbnails`);
      setAllThumbnails(result.data);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadAllThumbnails(true);
    }
  };

  useEffect(() => {
    getUserData();
    getSavedArtwork();
    getSavedEvent();
    getSavedResource();
    getAllEvents();
    getAllResources();
    getThumbnails();
  }, []);

  const onPressEventCard = () => {
    navigation.navigate('Saved Events Screen');
  };

  const onPressResourceCard = () => {
    navigation.navigate('Saved Resources Screen');
  };

  const onPressArtworkCard = () => {
    navigation.navigate('Saved Artwork Screen');
  };

  // Display and edit profile info
  return (
    <ScrollView style={styles.container}>
      <View style={styles.nameAndEditButtonContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {currFirstName}
          </Text>
          <Text style={styles.name}>
            {currLastName}
          </Text>
        </View>
        <Button title="Edit" onPress={() => navigation.navigate('Edit Profile')} />
      </View>
      <View style={styles.avatarHandleContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1454769/pexels-photo-1454769.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}
            resizeMode="cover"
            style={styles.avatar}
          />
        </View>
        <View styles={styles.handleContainer}>
          <Text styles={styles.handleText}>
            {currFacebook}
          </Text>
          <Text styles={styles.handleText}>
            {currTwitter}
          </Text>
          <Text styles={styles.handleText}>
            {currInstagram}
          </Text>
        </View>
      </View>
      <View>
        <View>
          <Text>
            {currBio}
          </Text>
        </View>
        <View style={styles.savedContainer}>
          <View style={styles.savedHeadingAndSeeAll}>
            <Text style={styles.heading}>
              Events
            </Text>
            <TouchableOpacity onPress={onPressEventCard} style={styles.seeAllSavedButton}>
              <Text style={styles.seeAllText}>See More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.savedCardContainer}>
            {loadSavedEvent ? (
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
            ) : <Text>There is no saved events</Text>}
          </View>
        </View>
        <View style={styles.savedContainer}>
          <View style={styles.savedHeadingAndSeeAll}>
            <Text style={styles.heading}>
              Resources
            </Text>
            <TouchableOpacity onPress={onPressResourceCard} style={styles.seeAllSavedButton}>
              <Text style={styles.seeAllText}>See More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.savedCardContainer}>
            {loadSavedResource ? (
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
            ) : <Text>There is no saved art</Text>}
          </View>
        </View>
        <View style={styles.savedContainer}>
          <View style={styles.savedHeadingAndSeeAll}>
            <Text style={styles.heading}>
              Art
            </Text>
            <TouchableOpacity onPress={onPressArtworkCard} style={styles.seeAllSavedButton}>
              <Text style={styles.seeAllText}>See More</Text>
            </TouchableOpacity>
          </View>
          {loadSavedArt ? (
            savedArt.map((oneArt) => (
              <View style={styles.savedArtCardContainer}>
                <Card style={styles.savedArtCard}>
                  <Card.Cover
                    style={{ height: 200, width: 200 }}
                    source={{ uri: findThumbnail(oneArt) }}
                  />
                </Card>
              </View>
            ))
          ) : <Text>There is no saved art</Text>}
        </View>
      </View>
    </ScrollView>
  );
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ProfileScreen;
