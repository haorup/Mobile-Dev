import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Home from './Component/Home';
import GoalDetails from './Component/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Component/Login';
import Signup from './Component/Signup';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';
import { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ProfileScreen from './Component/ProfileScreen';
import PressButton from './Component/PressButton';
import { signOut } from 'firebase/auth';

const Stack = createNativeStackNavigator();
const AuthStack = (
  <>
    <Stack.Screen name='Signup' component={Signup} />
    <Stack.Screen name='Login' component={Login} />
  </>
)
const AppStack = (
  <>
    <Stack.Screen name="Home"
      component={Home}
      options={
        ({route, navigation}) => {
        return {
        title: 'Home',
          headerRight: () => {
            return (
              <PressButton passedOnPress={function(){navigation.navigate('ProfileScreen')}}>
            <MaterialCommunityIcons name="account" size={24} color="black" />
            </PressButton>);
        }
      }
      }} />
    <Stack.Screen name="GoalDetails" component={GoalDetails}
      options={({ route }) => {
        return {
          title: route.params
            ? route.params.goalData.text
            : "undefined details",
          // headerRight: () => {
          //   return (<Button title='Warnings'/>)
          // }
        }
      }} />
      <Stack.Screen name='ProfileScreen' component={ProfileScreen}
      options={()=> {
        return {
          headerRight: () => {
            return (
              <PressButton passedOnPress={()=>{signOut(auth)}}>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
            </PressButton>
            )
          }
        }
      }} />
  </>
)

export default function App() {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    }
    )
  }, []);

  return (
    < NavigationContainer >
      {/* <Home /> */}
      <Stack.Navigator screenOptions={{
        initialRouteName: 'Signup',
        headerStyle: { backgroundColor: 'yellow' },
        headerTintColor: 'green',
        backgroundColor: 'lightgreen',
      }}>
        {isLogged ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})