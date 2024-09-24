import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default function GoalItem({ goalObj, goalDeleteHandler }) {
    function handleDelete() {
        goalDeleteHandler(goalObj.id);
    }
    return(<View 
        style={styles.textBackgroundStyle}>
        <Text style={styles.text}>{goalObj.text}</Text>
        <Button title='X' onPress={() => handleDelete()}/>
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
        flexDirection: 'row',
    },
})
