import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications';

export default function NotificationManager() {
    const [response, requestPermission] = Notifications.getPermissionsAsync();

    async function verifyPermissions() {
        if (response.status !== 'granted') {
            const newResponse = await Notifications.requestPermissionsAsync();
            if (newResponse.status !== 'granted') {
                Alert.alert(
                    'Insufficient permissions!',
                    'You need to grant notification permissions to use this app.',
                    [{ text: 'Okay' }]
                );
                return false;
            }
            return true;
        }
        return true;
    }

    async function scheduleNotificationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        try{
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'You have a new goal!',
                    body: 'Time to get to work!',
                },
                trigger: {
                    seconds: 5,
                },
            });
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