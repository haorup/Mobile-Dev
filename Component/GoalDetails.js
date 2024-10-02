import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function GoalDetails({ navigation, route }) {

  function moreDetailHandler() {
    navigation.push("GoalDetails");
  }

  function warningHandler() {}


  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Warnings"
          onPress={() => (console.log("warnings"))} />
      ),
    })
  });

  return (
    <View>
      {route.params ? (
        <View>
          <Text style={[styles.text, styles.blackColor]}>
            Goal Details: {route.params.goalData.text} {'\n'}
            Goal ID: {route.params.goalData.id}
          </Text>
          <Button title="More Details" onPress={moreDetailHandler} />
        </View>
      ) : (
        <Text>No more Details</Text>
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