import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import MainScreenView from "./Screens/MainScreenView";

import LoginScreen from "./Screens/AuthScreens/LoginScreen";
import RegistrationScreen from "./Screens/AuthScreens/RegistrationScreen";
import ResetPasswordScreen from "./Screens/AuthScreens/ResetPasswordScreen";

import ProfileMainScreen from "./Screens/ProfileScreens/UserScreens/ProfileMainScreen";

import {Provider} from 'react-redux';

import store from './Store/store';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
      <Provider store={store}>
          <NavigationContainer>
              <Stack.Navigator initialRouteName='Main' screenOptions={{
                  headerShown: false,
              }}>
                  <Stack.Screen name="Main" component={MainScreenView} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Register" component={RegistrationScreen} />
                  <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

                  <Stack.Screen name="Profile" component={ProfileMainScreen} />
              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
    );
}
