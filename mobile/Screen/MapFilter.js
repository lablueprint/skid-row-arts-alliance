import React, { useState, useEffect } from 'react';
import {
  ScrollView, Button, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import EventCard from '../Components/EventCard';
import ResourceCard from '../Components/ResourceCard';

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

//   const food = resources.filter((resource) => resource.tag === 'Food');
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
    let missionAdded = false;

    // all events are workshops
    if (categories.workshop) {
      const workshops = (database.filter((event) => event.tags === 'Workshop'));
      eventsArray = eventsArray.concat(workshops);
    }

    if (categories.food) {
      const food = (database.filter((resource) => resource.tags === 'Food'));
      resourcesArray = resourcesArray.concat(food);

      if (!missionAdded) {
        const mission = (database.filter((resource) => resource.tags === 'Mission'));
        resourcesArray = resourcesArray.concat(mission);
        missionAdded = true;
      }
    }

    if (categories.shelter) {
      const shelter = (database.filter((resource) => resource.tags === 'Shelter'));
      resourcesArray = resourcesArray.concat(shelter);

      if (!missionAdded) {
        const mission = (database.filter((resource) => resource.tags === 'Mission'));
        resourcesArray = resourcesArray.concat(mission);
        missionAdded = true;
      }
    }

    // all three
    if (categories.mission) {
      if (!missionAdded) {
        const mission = (database.filter((resource) => resource.tags === 'Mission'));
        resourcesArray = resourcesArray.concat(mission);
        missionAdded = true;
      }
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

  // call filter only when apply is implemented
  const [count, setCount] = useState(0);
  const onPressApply = () => {
    setCount(count + 1);
  };
  useEffect(() => { filter(); }, [count]);

  // useEffect(() => { filter(); }, [categories]);
  // TO DO: get rid of useEffect. When you hit apply, calls filter() -- done
  // TO DO: make a SEPARATE filtered array for events and resources, call it filteredEvents
  // TO DO: then use map function to map out filteredEvents and filteredResources arrays
  return (
    <ScrollView>
      <Button title="food" onPress={() => onPressCategories('food')} />
      <Text>
        {categories.food ? 'True' : 'False'}
      </Text>
      <Button title="shelter" onPress={() => onPressCategories('shelter')} />
      <Text>
        {categories.shelter ? 'True' : 'False'}
      </Text>
      <Button title="mission" onPress={() => onPressCategories('mission')} />
      <Text>
        {categories.mission ? 'True' : 'False'}
      </Text>
      <Button title="workshop" onPress={() => onPressCategories('workshop')} />
      <Text>
        {categories.workshop ? 'True' : 'False'}
      </Text>
      <Button title="apply" onPress={() => onPressApply()}>apply</Button>

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

// return (
//   <View>
//      <Button title="food" onPress={() => onPressCategories('food')}> food </Button>
//      <Button title="shelter" onPress={() => onPressCategories('shelter')}> shelter </Button>
//      <Button title="mission" onPress={() => onPressCategories('shelter')}> shelter </Button>
//   </View>
// )

// }

// filter function that takes stuff in array by tags
// workshop and then apply -> console.log the filtered elements

// export default function MapFilterPractice() {
//   const [categories, setCategories] = useState({ workshop: false, food: false, shelter: false });
//   const onPressCategories = (property) => {
//     console.log(categories);
//     const updateCategories = { ...categories };
//     updateCategories[property] = !categories[property];
//     setCategories(updateCategories);
//   };
//   // onPress syntax: () =>
//   return (
//     <View>
//       <Button title="workshop" onPress={() => onPressCategories('workshop')}> workshop </Button>
//       <Text>
//         workshop:
//         {' '}
//         {categories.workshop ? 'True' : 'False'}
//       </Text>
//       <Button title="food" onPress={() => onPressCategories('food')}> food </Button>
//       <Text>
//         food:
//         {' '}
//         {categories.food ? 'True' : 'False'}
//       </Text>
//       <Button title="shelter" onPress={() => onPressCategories('shelter')}> shelter </Button>
//       <Text>
//         shelter:
//         {categories.shelter ? 'True' : 'False'}
//       </Text>
//     </View>

//   );
// }
