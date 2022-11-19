import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MapScreen from "./Screen/MapScreen";
import GalleryScreen from "./Screen/GalleryScreen";
import SubmissionScreen from "./Screen/SubmissionScreen";
import ProfileScreen from "./Screen/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Gallery" component={GalleryScreen} />
        <Tab.Screen name="Submission" component={SubmissionScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
