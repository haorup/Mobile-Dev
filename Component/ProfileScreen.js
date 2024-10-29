import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../Firebase/firebaseSetup'

export default function ProfileScreen({route}) {
  return (
    <View>
      <Text>{auth.currentUser.uid}</Text>
      <Text>{auth.currentUser.email}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})