import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import MapScreen from './Screen/MapScreen';
import GalleryScreen from './Screen/GalleryScreen';
import SubmissionScreen from './Screen/SubmissionScreen';
import ProfileScreen from './Screen/ProfileScreen';
import SignUpScreen from './Screen/SignUpScreen';
import store from './redux/store';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Provider store={store}>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Gallery" component={GalleryScreen} />
        <Tab.Screen name="Submission" component={SubmissionScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </Provider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false, gestureEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
