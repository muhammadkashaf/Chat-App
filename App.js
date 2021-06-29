// import React from 'react';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import * as firebase from "firebase";
import Otp from './screens/Otp';
import Register from './screens/Register';

const Stack = createStackNavigator();

class App extends React.Component {
  constructor() {
    super();
  }
  UNSAFE_componentWillMount() {
    // Initialize Firebase
    var FirebaseConfig = {
      apiKey: "AIzaSyA2z-CJdY9jurga7O1XX4b3ZziFt0J7dIk",
      authDomain: "encryptical-3a180.firebaseapp.com",
      databaseURL: "https://encryptical-3a180-default-rtdb.firebaseio.com",
      projectId: "encryptical-3a180",
      storageBucket: "encryptical-3a180.appspot.com",
      messagingSenderId: "328318101719",
      appId: "1:328318101719:web:fb3610bc6c58a2eeb56892"
    };
    firebase.initializeApp(FirebaseConfig);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthLoading">
          <Stack.Screen
            name="AuthLoading"
            component={AuthLoadingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={HomeScreen.navigationOptions}
          />
          <Stack.Screen
            name="Auth"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={ChatScreen.navigationOptions}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
