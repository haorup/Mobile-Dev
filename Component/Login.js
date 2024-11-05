import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import PressButton from './PressButton'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase/firebaseSetup'
import { useState } from 'react'
import { Alert } from 'react-native'

export default function Login({navigation}) {
    const [emailVar, setEmailVar] = useState('')
    const [passwordVar, setPasswordVar] = useState('')
    function handleNavigation() {
        navigation.replace('Signup')
    }
    const handleLogin = async () => {
        if ( !emailVar || !passwordVar ) {
            Alert.alert('Please enter email and password')
            return;
        }
        try{
            const userCred = await signInWithEmailAndPassword(auth, emailVar, passwordVar);
        } catch (error) {
            console.log('error', error)
            Alert.alert('Failed to login')
        }
    }
  return (
    <View style={styles.container}>

      <Text style={styles.text}>Email address</Text>
      <TextInput style={styles.input}
      placeholder='Email'
      value={emailVar}
      secureTextEntry={false}
      onChangeText={setEmailVar} />

      <Text style={styles.text}>Password</Text>
      <TextInput style={styles.input}
      secureTextEntry={true}
      placeholder='Password'
      value={passwordVar}
      onChangeText={setPasswordVar} />

      {/* button section */}
      <PressButton componentStyle={styles.buttonStyle}
      passedOnPress={handleLogin}>
        <Text style={[styles.text, { fontSize: 15 }]}>Login</Text>
      </PressButton>

      <PressButton componentStyle={styles.buttonStyle}
      passedOnPress={handleNavigation}>
        <Text style={[styles.text, { fontSize: 15 }]}>New user? Create an account</Text>
      </PressButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
},
text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    margin: 0,
    paddingLeft: 10,
},
input: {
    borderWidth: 1,
    borderRadius: 5,
    width: '90%',
    padding: 10,
    margin: 10,
    fontSize: 20,
},
buttonStyle: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: '70%',
    alignSelf: 'center',
},
})