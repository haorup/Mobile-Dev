import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useState } from 'react';

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
    })
  }

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Warnings"
        color={isRedColor ? 'red' : 'blue'}
          onPress={() => (warningHandler())} />
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