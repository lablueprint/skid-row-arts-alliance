import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import { Picker } from '@react-native-picker/picker';
import { Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { serviceUpdateUser } from '../redux/services';
import { logout } from '../redux/sliceAuth';

const cardGap = 15;

const cardWidth = 170;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
  },
  savedContainer: {
    paddingBottom: 30,
  },
  savedHeadingAndSeeAll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
  savedEventCardContainer: {
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
  savedArtCard: {
    paddingBottom: 10,
    borderRadius: 15,
    borderColor: '#CD7F3D',
    borderLeftWidth: 15,
    borderWidth: 2,
  },
  heading: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    color: '#1E2021',
  },
  savedTitle: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: '#1E2021',
  },
  savedCategoryTitle: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: '#1E2021',
    paddingBottom: 5,
  },
  seeAllSavedButton: {
    backgroundColor: 'transparent',
    // left justify
  },
  seeAllText: {
    fontSize: 14,
    color: '#424288',
  },
});

function ProfileScreen({ navigation }) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [platform, setPlatform] = useState('');
  const [tag, onChangeTag] = useState('');
  const [loadSavedArt, setLoadSavedArt] = useState(false);
  const [savedArt, setSavedArt] = useState([]);
  const [loadAllEvent, setLoadAllEvent] = useState(false);
  const [loadSavedEvent, setLoadSavedEvent] = useState(false);
  const [savedEvent, setSavedEvent] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const [loadAllThumnails, setLoadAllThumbnails] = useState(false);
  const [allThumbnails, setAllThumbnails] = useState([]);

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

  const findThumbnail = (artID) => {
    const artInfo = {
      thumbNail: 'No Tag',
    };
    if (loadAllThumnails) {
      allThumbnails.forEach((thumbnail) => {
        if (thumbnail.SubmissionId === artID) {
          console.log(thumbnail.ImageURL);
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
    getSavedArtwork();
    getSavedEvent();
    getAllEvents();
    getThumbnails();
  }, []);
  const dispatch = useDispatch();

  const handleClear = () => {
    // serviceUpdateUser({
    //   userName: '',
    //   userEmail: '',
    //   userSocialPlatform: '',
    //   userSocialTag: '',
    // });
  };

  // const updatedUser = {
  //   userName: name,
  //   userEmail: email,
  //   userSocialPlatform: platform,
  //   userSocialTag: tag,
  // };

  const handleUpdate = () => {
    // serviceUpdateUser(updatedUser);
  };

  // Store input and navigate to Home screen
  const handleSignOut = async () => {
    dispatch(logout());
  };

  const onPressBackButton = () => {
    navigation.navigate('Saved Events Screen');
  };

  // Display and edit profile info
  return (
    <ScrollView style={styles.container}>
      <View style={{
        paddingTop: 30,
        paddingBottom: 50,
      }}
      >
        <Button
          title="Sign Out"
          onPress={() => {
            handleSignOut();
          }}
        />
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Name: </Text>
          currentUser.userName
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Email: </Text>
          currentUser.userEmail
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Social Platform: </Text>
          currentUser.userSocialPlatform
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Social Tag: </Text>
          currentUser.userSocialTag
        </Text>
      </View>
      <View style={{ paddingBottom: 40 }}>
        <Text style={{ fontWeight: '800', fontSize: 25, paddingBottom: 10 }}>
          Edit Profile Fields
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ paddingRight: 10 }}>
            Name:
          </Text>
          <TextInput
            placeholder="Name"
            onChangeText={onChangeName}
            value={name}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ paddingRight: 10 }}>
            Email:
          </Text>
          <TextInput
            placeholder="Email"
            onChangeText={onChangeEmail}
            value={email}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>
            Social Platform:
          </Text>
          <Picker
            selectedValue={platform}
            style={{ height: 200, width: 150 }}
            onValueChange={(itemValue) => setPlatform(itemValue)}
          >
            <Picker.Item label="Instagram" value="instagram" />
            <Picker.Item label="Twitter" value="twitter" />
            <Picker.Item label="Facebook" value="facebook" />
          </Picker>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ paddingRight: 10 }}>
            Social Tag:
          </Text>
          <TextInput
            placeholder="Account Tag"
            onChangeText={onChangeTag}
            value={tag}
          />
        </View>
      </View>
      <View style={styles.savedContainer}>
        <View style={styles.savedHeadingAndSeeAll}>
          <Text style={styles.heading}>
            Events
          </Text>
          <TouchableOpacity onPress={onPressBackButton} style={styles.seeAllSavedButton}>
            <Text style={styles.seeAllText}>See More</Text>
          </TouchableOpacity>
        </View>
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
      </View>
      <View>
        <Text style={styles.heading}>
          Art
        </Text>
        {
        loadSavedArt ? (
          savedArt.map((oneArt) => (
            <Card>
              <Card.Content style={styles.savedArtCard}>
                <Image // works with card.cover as well
                  style={{ height: 250, width: 250 }}
                  source={{ uri: findThumbnail(oneArt) }}
                />
              </Card.Content>
            </Card>
          ))
        ) : <Text>There is no saved art</Text>
      }
      </View>
      <Button title="Save" onPress={handleUpdate} />
      <Button title="Clear" onPress={handleClear} />
    </ScrollView>
  );
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ProfileScreen;
