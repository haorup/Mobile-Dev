import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import PressButton from './PressButton'
import { useNavigation } from '@react-navigation/native'

export default function Signup() {
    const navigation = useNavigation()

    function handleNavigation() {
        navigation.replace('Login')
    }
  return (
    <View style={styles.container}>
      <Text>Email address</Text>
      <TextInput placeholder='Email' />
      <Text>Password</Text>
      <TextInput placeholder='Password' />
      <Text>Confirm Password</Text>
      <TextInput placeholder='Confirm Password' />
      <PressButton>
        <Text>Register</Text>
      </PressButton>
      <PressButton
      passedOnPress={handleNavigation}>
        <Text>Already registered? Login</Text>
      </PressButton>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        dlex: 1,
        padding: 10,
        margin: 10,
        backgroundColor: 'lightgreen',
        alignItems: 'center',
    }
})