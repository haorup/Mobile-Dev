import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../Firebase/firebaseSetup'
import LocationManager from './LocationManager'
import NotificationManager from './NotificationManager'

export default function ProfileScreen({route}) {
  return (
    <View>
      <Text>{auth.currentUser.uid}</Text>
      <Text>{auth.currentUser.email}</Text>
      <LocationManager />
      <NotificationManager />
    </View>
  )
}

const styles = StyleSheet.create({})