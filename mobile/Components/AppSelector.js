import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import MapScreen from '../Screen/MapScreen';
import GalleryScreen from '../Screen/GalleryScreen';
import SubmissionScreen from '../Screen/SubmissionScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import SignUpScreen from '../Screen/SignUpScreen';
import SignInScreen from '../Screen/SignInScreen';
import ArtworkDetailScreen from '../Screen/ArtworkDetailScreen';
// import store from '../redux/store';
import EventDetailScreen from '../Screen/EventDetailScreen';
import EventScreen from '../Screen/EventScreen';
import ResourceDetailScreen from '../Screen/ResourceDetailScreen';
import OrganizationDetailScreen from '../Screen/OrganizationDetailScreen';
import { isTokenExpired } from '../redux/sliceAuth';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Submission" component={SubmissionScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Events" component={EventScreen} />
    </Tab.Navigator>
  );
}

function AppSelector() {
  const { id, token } = useSelector((state) => state.auth);

  return (
    (token && !isTokenExpired(token) && id) ? (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Event Details" component={EventDetailScreen} />
          <Stack.Screen name="Artwork Details" component={ArtworkDetailScreen} />
          <Stack.Screen name="Resource Details" component={ResourceDetailScreen} />
          <Stack.Screen name="Organization Details" component={OrganizationDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    ) : (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}

export default AppSelector;
