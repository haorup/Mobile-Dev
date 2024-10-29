import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import PressButton from './PressButton'

export default function Login({navigation}) {
    function handleNavigation() {
        navigation.replace('Signup')
    }
  return (
    <View>
      <Text>Email address</Text>
      <TextInput placeholder='Email' />
      <Text>Password</Text>
      <TextInput placeholder='Password' />
      <PressButton>
        <Text>Login</Text>
      </PressButton>
      <PressButton
      passedOnPress={handleNavigation}>
        <Text>New user? Create an account</Text>
      </PressButton>
    </View>
  )
}

const styles = StyleSheet.create({})