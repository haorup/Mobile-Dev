import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function GoalDetails({navigation, route}) {

    function moreDetailHandler() {
        navigation.push("GoalDetails");

    }
  return (
    <View>
    {route.params ? (
        <View>
      <Text style={styles.text}>
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
        color: 'blue',
        fontSize: 20,
        padding: 5,
        alignSelf: 'center',
    },
})