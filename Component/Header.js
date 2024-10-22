import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    fontSize: windowWidth < 380 ? 20: 26,
    paddingHorizontal: windowWidth < 380 ? 10: 20,
    borderColor: 'purple',
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  }
})