import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const PressButton = ({ children,
    passedStyle,
    passedOnPress }) => {
    return (
        <View>
            <Pressable
            style={({ pressed }) => {
                return [
                    styles.defaultStyle,
                    pressed && styles.defaultPressedSytle,
                    pressed && passedStyle,
                ]
            }}
                onPress={passedOnPress}>
                {children}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    defaultStyle: {
        fontWeight: 'bold',
        padding: 5,
        radius: 5,

    },
    defaultPressedSytle: {
        backgroundColor: 'white',
        opacity: 0.2,
    }
})

export default PressButton