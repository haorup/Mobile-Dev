import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

export default function Login() {
  return (
    <View>
      <Text>Email address</Text>
      <TextInput placeholder='Email' />
      <Text>Password</Text>
      <TextInput placeholder='Password' />
    </View>
  )
}

const styles = StyleSheet.create({})