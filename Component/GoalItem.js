import React from 'react';
import { Button, View, Text, StyleSheet, Pressable } from 'react-native';

export default function GoalItem({ goalObj,
    goalDeleteHandler, passedNavigation }) {

    function handleDelete() {
        goalDeleteHandler(goalObj.id);
    }

    // make use of the passed navigation from Home.js
    function handleNavigation() {
        passedNavigation.navigate('GoalDetails',
            { goalData: goalObj });
    }
    return (<View
        style={styles.textBackgroundStyle}>
        <Pressable onPress={() => handleNavigation()}
            style={({ pressed }) => {
                return [styles.pressableStyle,
                {
                    backgroundColor: pressed ?
                        'red' : 'yellow',
                    opacity: pressed ? 0.2 : 1,
                },
                ]
            }}
            android_ripple={{ color: 'red', radius: 25 }}>
            <Text style={styles.text}>{goalObj.text}</Text>
            <Button title='X' color='red' onPress={() => handleDelete()} />
        </Pressable>
    </View>)
}

const styles = StyleSheet.create({
    text: {
        color: 'blue',
        fontSize: 20,
        padding: 5,
    },
    textBackgroundStyle: {
        backgroundColor: 'yellow',
        borderRadius: 5,
        margin: 5,
        // flexDirection: 'row',
    },
    pressableStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    pressedStyle: {
        color: 'red',
    },
})
