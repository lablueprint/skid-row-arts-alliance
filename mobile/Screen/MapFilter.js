import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity, ScrollView, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import EventCard from '../Components/EventCard';
import ResourceCard from '../Components/ResourceCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-direction',
    paddingHorizontal: 20,
  },
  button: {
    width: '40%',
    height: 45,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#C0C0DC',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
  },
  title: {
    color: '#6666A9',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
});

const events = [{
  id: 1,
  title: 'Volunteering',
  date: '10/03/2023',
  day: 'Monday',
  location: '3148 Rose Rd, LA',
  organizations: 'BPlate',
  description: 'helping artist hang artwork',
  time: '1:00-2:00pm',
  summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam aquis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat.',
  number: '(123) 345 5678',
  email: 'studio526@gmail.com',
  website: 'studio526.com',
  url: 'https:/upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  tags: 'Workshop',
},
{
  id: 2,
  title: 'Fundraiser',
  date: '09/08/2023',
  day: 'Tuesday',
  location: '4102 Daisy Rd, LA',
  organizations: 'Studio 526',
  description: 'raising money for skid row artists',
  time: '1:00-2:00pm',
  summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam aquis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat.',
  number: '(123) 345 5678',
  email: 'studio526@gmail.com',
  website: 'studio526.com',
  url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  tags: 'Workshop',
},
{
  id: 3,
  title: 'Information Session',
  date: '03/05/2023',
  day: 'Wednesday',
  location: '4123 Blue Rd, LA',
  organizations: 'Cafe 1919',
  description: 'information on the skid row artists',
  time: '1:00-2:00pm',
  summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam aquis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat.',
  number: '(123) 345 5678',
  email: 'studio526@gmail.com',
  website: 'studio526.com',
  url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  tags: 'Workshop',
}];

const resources = [
  {
    id: 1,
    title: 'Food Bank',
    day: 'Mon-Fri',
    time: '2-5pm',
    location: '3148 Rose Rd, LA',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam aquis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat.',
    number: '(123) 345 5678',
    email: 'studio526@gmail.com',
    website: 'studio526.com',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    tags: 'Food',
  },
  {
    id: 2,
    title: 'Shelter',
    day: 'Tue, Thu',
    time: '9am-5pm',
    location: '4102 Daisy Rd, LA',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam aquis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat.',
    number: '(123) 345 5678',
    email: 'studio526@gmail.com',
    website: 'studio526.com',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    tags: 'Shelter',
  },
  {
    id: 3,
    title: 'Mission',
    day: 'Mon, Wed, Fri',
    time: '9-10am',
    location: '4123 Blue Rd, LA',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam aquis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat.',
    number: '(123) 345 5678',
    email: 'studio526@gmail.com',
    website: 'studio526.com',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    tags: 'Mission',
  },
];

export default function MapFilter({ navigation }) {
  const [categories, setCategories] = useState({
    workshop: false,
    food: false,
    shelter: false,
    mission: false,
  });

  const [database, setDatabase] = useState([]);

  const fillDatabase = () => {
    let databaseArray = [];
    databaseArray = databaseArray.concat(events, resources);
    setDatabase(databaseArray);
  };

  useEffect(() => { fillDatabase(); }, []);
  const [filteredResources, setResources] = useState([]);
  const [filteredEvents, setEvents] = useState([]);

  const filter = () => {
    let resourcesArray = [];
    let eventsArray = [];

    // all events are workshops
    if (categories.workshop) {
      eventsArray = eventsArray.concat(database.filter((event) => event.tags === 'Workshop'));
    }

    if (categories.food) {
      resourcesArray = resourcesArray.concat(database.filter((resource) => resource.tags === 'Food'));
    }

    if (categories.shelter) {
      resourcesArray = resourcesArray.concat(database.filter((resource) => resource.tags === 'Shelter'));
    }

    if (categories.food || categories.shelter || categories.mission) {
      resourcesArray = resourcesArray.concat(database.filter((resource) => resource.tags === 'Mission'));
    }

    // if all are false
    if (!categories.food && !categories.shelter && !categories.mission && !categories.workshop) {
      resourcesArray = resources;
      eventsArray = events;
    }

    setResources(resourcesArray);
    setEvents(eventsArray);
  };

  // update the true/false categories
  const onPressCategories = (property) => {
    const updateCategories = { ...categories };
    updateCategories[property] = !categories[property];
    setCategories(updateCategories);
  };

  const clearCategories = () => {
    setCategories(false);
  };

  // call filter only when apply is implemented
  const [count, setCount] = useState(0);
  const onPressApply = () => {
    setCount(count + 1);
  };
  useEffect(() => { filter(); }, [count]);

  const [clearCount, setClearCount] = useState(0);
  const onPressClear = () => {
    setClearCount(clearCount + 1);
  };

  useEffect(() => { clearCategories(); }, [clearCount]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={[styles.button, { width: 100 }]} title="food" onPress={() => onPressCategories('food')}>
        <Text style={styles.title}>
          Food
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { width: 110 }]} title="shelter" onPress={() => onPressCategories('shelter')}>
        <Text style={styles.title}>
          Shelter
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { width: 120 }]} title="mission" onPress={() => onPressCategories('mission')}>
        <Text style={styles.title}>
          Mission
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} title="workshop" onPress={() => onPressCategories('workshop')}>
        <Text style={styles.title}>
          Workshop
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { borderRadius: 4 }, { width: 140 }, { borderColor: '#424288' }]} title="apply" onPress={() => onPressClear()}>
        <Text style={[styles.title, { color: '#424288' }, { fontWeight: '600' }]}>
          Clear All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { borderRadius: 4 }, { width: 170 }, { backgroundColor: '#424288' }, { borderColor: '#424288' }]} title="apply" onPress={() => onPressApply()}>
        <Text style={[styles.title, { color: 'white' }, { fontWeight: '600' }]}>
          Apply
        </Text>
      </TouchableOpacity>

      {filteredResources.map((resource) => (
        <ResourceCard
          id={resource.id}
          title={resource.title}
          day={resource.day}
          time={resource.time}
          summary={resource.summary}
          url={resource.url}
          location={resource.location}
          navigation={navigation}
          number={resource.number}
          email={resource.email}
          website={resource.website}
          tag={resource.tag}
        />
      ))}
      {filteredEvents.map((event) => (
        <EventCard
          id={event.id}
          title={event.title}
          date={event.date}
          day={event.day}
          location={event.location}
          time={event.time}
          organizations={event.organizations}
          number={event.number}
          email={event.email}
          website={event.website}
          description={event.description}
          summary={event.summary}
          url={event.url}
          navigation={navigation}
          tag={event.tag}
        />
      ))}
    </ScrollView>
  );
}

MapFilter.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
