import React, { useState, useEffect } from 'react';
import {
  View, TouchableOpacity, ScrollView, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

/* TO DO: pull data from back-end, the reason it is not rendering right now is prolly because
in MapScreen when you render MapCard it has MapCard and does resource.ResourceData */
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
  },
});

/*
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
  tags: 'Visual Art',
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
  tags: 'Film',
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
  tags: 'Music',
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
*/
export default function MapFilter({ route }) {
  const { setAllEvents, setAllResources } = route.params || {};
  const [categories, setCategories] = useState({
    visualArt: false,
    film: false,
    music: false,
    food: false,
    shelter: false,
    mission: false,
    health: false,
    legalServices: false,
    socialServices: false,
    shower: false,
  });

  const getAllEvents = async () => {
    try {
      const result = await axios.get(`${URL}/event/get`);
      setAllEvents(result.data);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const getAllResources = async () => {
    try {
      const result = await axios.get(`${URL}/resource/get`);
      setAllResources(result.data);
      return result.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  useEffect(() => {
    getAllEvents();
    getAllResources();
  }, []);

  const [database, setDatabase] = useState([]);

  const fillDatabase = () => {
    let databaseArray = [];
    databaseArray = databaseArray.concat(events, resources);
    setDatabase(databaseArray);
  };

  useEffect(() => { fillDatabase(); }, []);

  const filter = () => {
    let resourcesArray = [];
    let eventsArray = [];

    // all events are workshops
    if (categories.visualArt) {
      eventsArray = eventsArray.concat(database.filter((event) => event.tags === 'Visual Art'));
    }

    if (categories.music) {
      eventsArray = eventsArray.concat(database.filter((event) => event.tags === 'Music'));
    }

    if (categories.film) {
      eventsArray = eventsArray.concat(database.filter((event) => event.tags === 'Film'));
    }

    if (categories.food) {
      resourcesArray = resourcesArray.concat(database.filter((resource) => resource.tags === 'Food'));
    }

    if (categories.shelter) {
      resourcesArray = resourcesArray.concat(database.filter((resource) => resource.tags === 'Shelter'));
    }

    if (categories.health) {
      resourcesArray = resourcesArray.concat(database.filter((resource) => resource.tags === 'Health'));
    }
    if (categories.legalServices) {
      resourcesArray = resourcesArray.concat(database.filter((resource) => resource.tags === 'Legal Services'));
    }
    if (categories.socialServices) {
      resourcesArray = resourcesArray.concat(database.filter((resource) => resource.tags === 'Social Services'));
    }
    if (categories.shower) {
      resourcesArray = resourcesArray.concat(database.filter((resource) => resource.tags === 'Shower'));
    }

    if (categories.food || categories.shelter || categories.mission) {
      resourcesArray = resourcesArray.concat(database.filter((resource) => resource.tags === 'Mission'));
    }

    // if all are false
    const allCategoriesAreFalse = Object.values(categories).every((value) => value === false);

    if (allCategoriesAreFalse) {
      resourcesArray = resources;
      eventsArray = events;
    }

    setAllResources(resourcesArray);
    setAllEvents(eventsArray);
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

  const eventCategories = [
    {
      title: 'Visual Art',
      key: 'visualArt',
    },
    {
      title: 'Film',
      key: 'film',
    },
    {
      title: 'Music',
      key: 'music',
    },
    {
      title: 'Miscellaneous',
      key: 'miscellaneous',
    },
  ];

  const resourceCategories = [
    {
      title: 'Food',
      key: 'food',
    },
    {
      title: 'Shelter',
      key: 'shelter',
    },
    {
      title: 'Mission',
      key: 'mission',
    },
    {
      title: 'Legal Services',
      key: 'legalServices',
    },
    {
      title: 'Social Services',
      key: 'socialServices',
    },
    {
      title: 'Shower',
      key: 'shower',
    },
  ];

  return (
    <ScrollView>
      <Text style={styles.title}>Workshops</Text>
      <View style={styles.container}>
        {eventCategories.map((category) => (
          <TouchableOpacity style={styles.button} onPress={() => onPressCategories(category.key)}>
            <Text style={styles.title}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.title}>Resources</Text>
      <View style={styles.container}>
        {resourceCategories.map((category) => (
          <TouchableOpacity style={styles.button} onPress={() => onPressCategories(category.key)}>
            <Text style={styles.title}>{category.title}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.button, { borderRadius: 4 }, { borderColor: '#424288' }]} title="apply" onPress={() => onPressClear()}>
          <Text style={[styles.title, { color: '#424288' }, { fontWeight: '600' }]}>
            Clear All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { borderRadius: 4 }, { backgroundColor: '#424288' }, { borderColor: '#424288' }]} title="apply" onPress={() => onPressApply()}>
          <Text style={[styles.title, { color: 'white' }, { fontWeight: '600' }]}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

MapFilter.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      setAllEvents: PropTypes.func.isRequired,
      setAllResources: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};
