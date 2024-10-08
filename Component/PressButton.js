import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const PressButton = ({ children,
    passedStyle,
    componentStyle,
    passedOnPress }) => {
    return (
        <View>
            <Pressable
            style={({ pressed }) => {
                return [
                    styles.defaultStyle,
                    componentStyle,
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
        backgroundColor: 'pink',
        opacity: 0.5,
    }
})

export default PressButton