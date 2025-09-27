import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthProvider, { AuthContext } from './src/context/AuthContext';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProfileMeScreen from './src/screens/ProfileMeScreen';
import UploadCertificateScreen from './src/screens/UploadCertificateScreen';
import AddEducationScreen from './src/screens/AddEducationScreen';
import MyEducationScreen from './src/screens/MyEducationScreen';
import SearchSeekersScreen from './src/screens/SearchSeekersScreen';
import SeekerPublicProfileScreen from './src/screens/SeekerPublicProfileScreen';

const Stack = createNativeStackNavigator();

function Root() {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="ProfileMe" component={ProfileMeScreen} options={{ title: 'My Profile' }} />
          <Stack.Screen name="UploadCertificate" component={UploadCertificateScreen} />
          <Stack.Screen name="AddEducation" component={AddEducationScreen} />
          <Stack.Screen name="MyEducation" component={MyEducationScreen} />
          <Stack.Screen name="SearchSeekers" component={SearchSeekersScreen} />
          <Stack.Screen name="SeekerPublic" component={SeekerPublicProfileScreen} options={{ title: 'Seeker Profile' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </AuthProvider>
  );
}
