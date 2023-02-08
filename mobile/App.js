import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MapScreen from './Screen/MapScreen';
import GalleryScreen from './Screen/GalleryScreen';
import SubmissionScreen from './Screen/SubmissionScreen';
import ProfileScreen from './Screen/ProfileScreen';
import SignUpScreen from './Screen/SignUpScreen';
import ArtworkDetailScreen from './Screen/ArtworkDetailScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Submission" component={SubmissionScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Artwork Details" component={ArtworkDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
