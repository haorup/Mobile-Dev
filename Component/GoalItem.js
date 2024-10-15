import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import PressButton from './PressButton';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function GoalItem({ goalObj, goalDeleteHandler,
    passedNavigation, passedSeparator }) {

    function handleDelete() {
        goalDeleteHandler(goalObj.id);
    }

    function handleLongPress() {
        Alert.alert(
            "Delete goal",
            "Do you want to delete this goal?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        handleDelete();
                    }
                }
            ]);
    }

    // make use of the passed navigation from Home.js
    function handleNavigation() {
        passedNavigation.navigate('GoalDetails',
            { goalData: goalObj });
    }
    return (<View
        style={styles.textBackgroundStyle}>
        <Pressable onPressIn={passedSeparator.highlight}
            onPressOut={passedSeparator.unhighlight}
            onLongPress={() => handleLongPress()}
            onPress={() => handleNavigation()}
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

            <PressButton passedStyle={styles.pressButtonSyle}
                passedOnPress={handleDelete}>
                <AntDesign name="delete" size={24} color='black' />
            </PressButton>
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
    pressButtonSyle: {
        margin: 5,  // use margin to make zoom effect.
        backgroundColor: 'lightgreen', // customized background color
    }
})
