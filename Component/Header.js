import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = ({ name }) => {

  return (
    <View>
      <Text style={styles.text}>Welcome to {name}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  text: {
    color: 'purple',
    fontSize: 20,
    borderColor: 'purple',
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  }
})