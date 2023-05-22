import React from 'react';
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
import ForgotPasswordScreen from '../Screen/ForgotPasswordScreen';
import ArtworkDetailScreen from '../Screen/ArtworkDetailScreen';
import EventDetailScreen from '../Screen/EventDetailScreen';
import EventScreen from '../Screen/EventScreen';
import ResourceDetailScreen from '../Screen/ResourceDetailScreen';
import SavedEventsScreen from '../Screen/SavedEventsScreen';
import SavedResourcesScreen from '../Screen/SavedResourcesScreen';
import SavedArtworkScreen from '../Screen/SavedArtworkScreen';
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

function AppNavigator() {
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
          <Stack.Screen name="Saved Events Screen" component={SavedEventsScreen} />
          <Stack.Screen name="Saved Resources Screen" component={SavedResourcesScreen} />
          <Stack.Screen name="Saved Artwork Screen" component={SavedArtworkScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    ) : (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Sign In" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}

export default AppNavigator;
