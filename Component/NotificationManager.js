import { StyleSheet, View, Alert } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications';
import { Button } from 'react-native'

export default function NotificationManager() {

    async function verifyPermissions() {
        try {
            const requestResponse = await Notifications.getPermissionsAsync();
            if (requestResponse.granted) {
                return true;
            }
            const newRequestResponse = await Notifications.requestPermissionsAsync();
            return newRequestResponse.granted;
        } catch (error) {
            console.error('Error verifying permissions: ', error);
            return false;
        }
    }

    async function scheduleNotificationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            Alert.alert('You need to grant notification permissions to use this app.');
        }
        try{
            const id = await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'You have a new goal!',
                    body: 'Time to get to work!',
                },
                trigger: {
                    seconds: 5,
                },
            });
            console.log('Notification scheduled: ', id);
        } catch (error) {
            console.error('Error scheduling notification: ', error);
        }
    }
  return (
    <View>
      <Button title='Schedule Notification' onPress={scheduleNotificationHandler}></Button>
    </View>
  )
}

const styles = StyleSheet.create({})