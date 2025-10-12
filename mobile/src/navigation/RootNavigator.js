import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import BrowseJobsScreen from "../screens/Jobs/BrowseJobsScreen";
import JobDetailsScreen from "../screens/Jobs/JobDetailsScreen";
import CreateJobScreen from "../screens/Jobs/CreateJobScreen";
import ConversationsScreen from "../screens/Chat/ConversationsScreen";
import ChatScreen from "../screens/Chat/ChatScreen";
import ProfileViewScreen from "../screens/Profile/ProfileViewScreen";
import PendingJobsScreen from "../screens/Admin/PendingJobsScreen";
import AdminMetricsScreen from "../screens/Admin/AdminMetricsScreen";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import useAuth from "../hooks/useAuth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  const { user } = useAuth();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Jobs" component={BrowseJobsScreen} />
      <Tab.Screen name="Chat" component={ConversationsScreen} />
      <Tab.Screen name="Profile" component={ProfileViewScreen} />
      {user?.role === "Admin" && (
        <Tab.Screen name="Admin" component={PendingJobsScreen} />
      )}
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { user } = useAuth();
  const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: "#0b0f14" },
  };

  const [loadingOnb, setLoadingOnb] = useState(true);
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const val = await AsyncStorage.getItem("onboarded_v1");
        setOnboarded(!!val);
      } finally {
        setLoadingOnb(false);
      }
    })();
  }, []);

  if (loadingOnb) return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#0b0f14" },
          headerTintColor: "#fff",
        }}
      >
        {!user ? (
          !onboarded ? (
            <>
              <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          )
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Tabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
            <Stack.Screen name="CreateJob" component={CreateJobScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="AdminMetrics" component={AdminMetricsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
