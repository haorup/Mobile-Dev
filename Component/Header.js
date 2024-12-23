import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Header = ({ name }) => {
  const { width, height } = useWindowDimensions();

  return (
    <View>
      <Text style={[styles.text,
      { paddingVertical: height < 415 ? 0 : 10 }]}>
        Welcome to {name}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  text: {
    color: 'purple',
    fontSize: windowWidth < 380 ? 20 : 26,
    paddingHorizontal: windowWidth < 380 ? 10 : 20,
    borderColor: 'purple',
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  }
})