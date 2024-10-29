import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import PressButton from './PressButton'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase/firebaseSetup'

export default function Signup() {
    const navigation = useNavigation()
    const [valueVar, setValueVar] = useState('')
    const [passwordVar, setPasswordVar] = useState('')

    function handleNavigation() {
        navigation.replace('Login')
    }

    // check if
    const handleSignUp = async () => {
        try {
        if (valueVar.trim() !== '' &&
            passwordVar.trim() !== '') {
            const usrCred = await createUserWithEmailAndPassword(auth, valueVar, passwordVar);
            }

        } catch (error) {
            console.log('error', error)
        }
        navigation.replace('Login');
    }

    return (
        <View style={styles.container}>
            <Text>Email address</Text>
            <TextInput placeholder='Email'
                value={valueVar}
                onChangeText={setValueVar} />
            <Text>Password</Text>
            <TextInput placeholder='Password'
                value={passwordVar}
                onChangeText={setPasswordVar} />
            <Text>Confirm Password</Text>
            <TextInput placeholder='Confirm Password' />

            <PressButton passedOnPress={handleSignUp}>
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