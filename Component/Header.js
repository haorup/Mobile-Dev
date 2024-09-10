import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = (prop) => {

  return (
    <View>
      <Text>Welcome to {prop.name}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})