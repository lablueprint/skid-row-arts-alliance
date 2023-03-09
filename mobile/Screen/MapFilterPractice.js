import React, { useState, useEffect } from 'react';
import {
  View, Button,
} from 'react-native';

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
export default function MapFilterPractice() {
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
  const [sorted, setSorted] = useState([]);

  const filter = () => {
    let largeArray = [];
    let missionAdded = false;

    if (categories.workshop) {
      const workshop = (database.filter((event) => event.tags === 'Workshop'));
      largeArray = largeArray.concat(workshop);
    }

    if (categories.food) {
      const food = (database.filter((resource) => resource.tags === 'Food'));
      largeArray = largeArray.concat(food);

      if (!missionAdded) {
        const mission = (database.filter((resource) => resource.tags === 'Mission'));
        largeArray = largeArray.concat(mission);
        missionAdded = true;
      }
    }

    if (categories.shelter) {
      const shelter = (database.filter((resource) => resource.tags === 'Shelter'));
      largeArray = largeArray.concat(shelter);

      if (!missionAdded) {
        const mission = (database.filter((resource) => resource.tags === 'Mission'));
        largeArray = largeArray.concat(mission);
        missionAdded = true;
      }
    }

    // TO DO: still needs work on all three
    if (categories.mission) {
      if (!missionAdded) {
        const mission = (database.filter((resource) => resource.tags === 'Mission'));
        largeArray = largeArray.concat(mission);
        missionAdded = true;
      }
    }

    // if all are false
    if (!categories.food && !categories.shelter && !categories.mission && !categories.workshop) {
      largeArray = database;
    }

    setSorted(largeArray);
  };

  const onPressCategories = (property) => {
    const updateCategories = { ...categories };
    updateCategories[property] = !categories[property];
    setCategories(updateCategories);
  };

  useEffect(() => { filter(); }, [categories]);

  console.log(sorted);

  // TO DO: when you hit apply, render all sorted array of objects
  return (
    <View>
      <Button title="food" onPress={() => onPressCategories('food')}> food </Button>
      <Button title="shelter" onPress={() => onPressCategories('shelter')}> shelter </Button>
      <Button title="mission" onPress={() => onPressCategories('mission')}> mission </Button>
      <Button title="workshop" onPress={() => onPressCategories('workshop')}> workshop </Button>
      <Button title="apply">apply</Button>
    </View>
  );
}

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
