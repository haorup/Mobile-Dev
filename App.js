import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Home from './Component/Home';
import GoalDetails from './Component/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    < NavigationContainer >
    {/* <Home /> */}
    <Stack.Navigator>
      <Stack.Screen name="Home"
      component={Home}
      options={{title:'Home',
      headerStyle: {backgroundColor: 'yellow'},
      headerTintColor: 'green'}} />
      <Stack.Screen name="GoalDetails" component={GoalDetails}
      options={({route}) => {return {title : route.params
      ? route.params.goalData.text
      : "undefined details",
      headerRight: () => {
        return (<Button title='Warnings'
          onPress={() => {console.log("warnings")}}/>)
      }}}} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})