import { StyleSheet, View, Button, Image } from 'react-native'
import React, { useEffect } from 'react'
import * as Location from 'expo-location'
import { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { updateDoc } from '../Firebase/firestoreHelper'
import {auth} from '../Firebase/firebaseSetup'

export default function LocationManager() {
    const [response, requestPermission] = Location.useForegroundPermissions()
    const [location, setLocation] = useState(null);
    const mapsApiKey = process.env.EXPO_PUBLIC_mapApiKey;
    const navigation = useNavigation();
    const route = useRoute();

    // save the location to firebase
    function saveLocationHandler() {
        updateDoc(auth.currentUser.uid, 'users', { location });
    }

    // useEffect(() => {
    //     async function getUserData() {
    //         const userData = await getOneDoc(auth.currentUser.uid, 'users');
    //         if (userData) {
    //             setLocation(userData.location);
    //         }
    //     }
    //     getUserData();
    //     }, []);

    useEffect(() => {
        if (route.params) {
            setLocation(route.params.selectedLocation);
        }
    }, [route]);

    async function verifyPermission() {
        if (response.granted) {
            return true;
        }
        const permission = await requestPermission();
        return permission.granted;
    }

    async function locateUserHandler() {
        try {
            const permission = await verifyPermission();
            if (permission) {
                const response = await Location.getCurrentPositionAsync();
                setLocation({
                    latitude: response.coords.latitude,
                    longitude: response.coords.longitude
                })
                console.log(location.latitude, location.longitude);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View>
            <Button title='get location' onPress={locateUserHandler}>
            </Button>
            <Button title='change to iteractive map' onPress={() => navigation.navigate('Maps')}>
            </Button>
            {location && <Image style={{ width: '100%', height: 200 }}
                source={{
                    uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`
                }}></Image>}
            <Button disabled={!location}
                title='save location'
                onPress={saveLocationHandler}></Button>
        </View>
    )
}

const styles = StyleSheet.create({})