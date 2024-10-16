import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import PressButton from './PressButton';
import { addWarningField } from '../Firebase/firestoreHelper';

export default function GoalDetails({ navigation, route }) {

  const [isRedColor, setIsRedColor] = useState(false);
  const textStyle = [styles.text, (isRedColor ? styles.redColor : styles.blackColor)];

  function moreDetailHandler() {
    navigation.push("GoalDetails");
  }

  function warningHandler() {
    setIsRedColor(!isRedColor);
    navigation.setOptions({
      title: "Warning",
      headerTintColor: 'red',
    });
    addWarningField('goals', route.params.goalData.id);

  }

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressButton
        passedOnPress={warningHandler}>
          <AntDesign name="warning" size={24} color="black" />
        </PressButton>
      ),
    })
  });

  return (
    <View>
      {route.params ? (
        <View>
          <Text style={textStyle}>
            Goal Details: {route.params.goalData.text} {'\n'}
            Goal ID: {route.params.goalData.id}
          </Text>
          <Button title="More Details" color={isRedColor ? 'red' : 'blue'}
          onPress={moreDetailHandler} />
        </View>
      ) : (
        <Text style={textStyle}>No more Details</Text>
      )}</View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 5,
    alignSelf: 'center',
  },
  blackColor: {
    color: 'black',
  },
  redColor: {
    color: 'red',
  }
})