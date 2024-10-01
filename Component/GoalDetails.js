import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalDetails({navigation, route}) {
  return (
    <View>
      <Text style={styles.text}>
        Goal Details: {route.params.goalData.text} {'\n'}
        Goal ID: {route.params.goalData.id}
      </Text>
    </View>
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