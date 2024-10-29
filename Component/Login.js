import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import PressButton from './PressButton'

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
        }
    }
  return (
    <View>
      <Text>Email address</Text>
      <TextInput placeholder='Email'
      value={emailVar}
      onChangeText={setEmailVar} />
      <Text>Password</Text>
      <TextInput placeholder='Password'
      value={passwordVar}
      onChangeText={setPasswordVar} />
      <PressButton passedOnPress={handleLogin}>
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