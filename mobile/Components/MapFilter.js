// import * as React from 'react';
// import {
//   ScrollView, navigate,
// } from 'react-native';
// // import PropTypes from 'prop-types';
// import EventCard from './EventCard';
// import ResourceCard from './ResourceCard';

// function MapFilter({ navigation }) {
//   const workshops = events.filter((event) => event.tag === 'Workshop');

//   const food = resources.filter((resource) => resource.tag === 'Food');

//   const shelter = resources.filter((resource) => resource.tag === 'Shelter');

//   const mission = resources.filter((resource) => resource.tag === 'Mission');

//   const showerAndLaundry = resources.filter((resource) => resource.tag === 'Shower & Laundry');

//   const socialServices = resources.filter((resource) => resource.tag === 'Social Services');

//   const legalServices = resources.filter((resource) => resource.tag === 'Legal Services');

//   const onPressWorkshop = () => {
//     { workshops.map((event) => (
//       <EventCard
//         id={event.id}
//         title={event.title}
//         date={event.date}
//         day={event.day}
//         location={event.location}
//         time={event.time}
//         organizations={event.organizations}
//         number={event.number}
//         email={event.email}
//         website={event.website}
//         description={event.description}
//         summary={event.summary}
//         url={event.url}
//         navigation={navigation}
//         tag={event.tag}
//       />
//     )); }
//   };

//   const onPressFood = () => {
//     { food.map((resource) => (
//       <ResourceCard
//         id={resource.id}
//         title={resource.title}
//         day={resource.day}
//         time={resource.time}
//         summary={resource.summary}
//         url={resource.url}
//         location={resource.location}
//         navigation={navigation}
//         number={resource.number}
//         email={resource.email}
//         website={resource.website}
//         tag={resource.tag}
//       />
//     )); }
//   };
// }
