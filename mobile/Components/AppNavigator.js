import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

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
import ArtworkFilterScreen from '../Screen/ArtworkFilterScreen';
import OutwardProfileScreen from '../Screen/OutwardProfileScreen';
import EditProfileScreen from '../Screen/EditProfileScreen';
import { isTokenExpired } from '../redux/sliceAuth';

const styles = StyleSheet.create({
  unselected: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    color: '#5B6772',
  },
  selected: {
    fontFamily: 'MontserratBold',
    fontSize: 11,
    color: '#4C4C9B',
  },
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MapIcon({ focused }) {
  return (
    <>
      <Image
        source={
          focused
            ? require('../assets/navbar/mapSelected.png')
            : require('../assets/navbar/map.png')
        }
        style={{ width: 30, height: 30 }}
      />
      <Text style={focused ? styles.selected : styles.unselected}>Map</Text>
    </>
  );
}

function EventsIcon({ focused }) {
  return (
    <>
      <Image
        source={
          focused
            ? require('../assets/navbar/eventsSelected.png')
            : require('../assets/navbar/events.png')
        }
        style={{ width: 30, height: 30 }}
      />
      <Text style={focused ? styles.selected : styles.unselected}>Events</Text>
    </>
  );
}

function GalleryIcon({ focused }) {
  return (
    <>
      <Image
        source={
          focused
            ? require('../assets/navbar/gallerySelected.png')
            : require('../assets/navbar/gallery.png')
        }
        style={{ width: 30, height: 30 }}
      />
      <Text style={focused ? styles.selected : styles.unselected}>Gallery</Text>
    </>
  );
}

function ZineIcon({ focused }) {
  return (
    <>
      <Image
        source={
          focused
            ? require('../assets/navbar/zineSelected.png')
            : require('../assets/navbar/zine.png')
        }
        style={{ width: 30, height: 30 }}
      />
      <Text style={focused ? styles.selected : styles.unselected}>Zine</Text>
    </>
  );
}

function ProfileIcon({ focused }) {
  return (
    <>
      <Image
        source={
          focused
            ? require('../assets/navbar/profileSelected.png')
            : require('../assets/navbar/profile.png')
        }
        style={{ width: 30, height: 30 }}
      />
      <Text style={focused ? styles.selected : styles.unselected}>Profile</Text>
    </>
  );
}

function HomeStackScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });

  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
    }}
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: MapIcon,
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{
          tabBarIcon: EventsIcon,
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          tabBarIcon: GalleryIcon,
          headerShown: false,
        }}
      />
      {/* TODO: change component to Zine to match hifi */}
      <Tab.Screen
        name="Zine"
        component={SubmissionScreen}
        options={{
          tabBarIcon: ZineIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ProfileIcon,
        }}
      />
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
          <Stack.Screen name="Artwork Filter" component={ArtworkFilterScreen} />
          <Stack.Screen name="Saved Events Screen" component={SavedEventsScreen} />
          <Stack.Screen name="Saved Resources Screen" component={SavedResourcesScreen} />
          <Stack.Screen name="Saved Artwork Screen" component={SavedArtworkScreen} />
          <Stack.Screen name="Outward Profile" component={OutwardProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Edit Profile" component={EditProfileScreen} options={{ headerShown: false }} />
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
