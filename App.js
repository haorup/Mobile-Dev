import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Home from './Component/Home';
import GoalDetails from './Component/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Component/Login';
import Signup from './Component/Signup';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    < NavigationContainer >
      {/* <Home /> */}
      <Stack.Navigator screenOptions={{
        initialRouteName: 'Signup',
        headerStyle: { backgroundColor: 'yellow' },
        headerTintColor: 'green',
        backgroundColor: 'lightgreen',
      }}>
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name="Home"
          component={Home}
          options={{ title: 'Home'}} />
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})