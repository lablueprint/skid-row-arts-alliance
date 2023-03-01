import React from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import EventCard from '../Components/EventCard';
import ResourceCard from '../Components/ResourceCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

function EventScreen({ navigation }) {
  return (
    <ScrollView style={styles.scrollView}>
      {events.map((event) => (
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
      {resources.map((resource) => (
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
    </ScrollView>
  );
}

EventScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default EventScreen;
