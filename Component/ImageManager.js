import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { launchCameraAsync, MediaTypeOptions, useCameraPermissions } from 'expo-image-picker'

export default function ImageManager({ passImageUri }) {
    const [response, requestPermission] = useCameraPermissions();
    const [image, setImage] = useState(null);
    async function verifyPermission() {
        if (response.granted) {
            return true;
        }
        const permission = await requestPermission();
        return permission.granted;
    }

    const imageHandler = async () => {
        try{
            const hasPermission = await verifyPermission();
            if (!hasPermission) {
                Alert.alert("Permission required",
                    "Please grant permission to access the camera",
                    [{ text: "OK" }]);
                return;
            }
        const result = await launchCameraAsync(
            {
                mediaTypes: MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.1,
            }
        );
        console.log(result);
        if (!result.canceled) {
        setImage(result.assets[0].uri);
        passImageUri(result.assets[0].uri);
        }
    } catch (error) {
            console.log(error)
        }
    }

  return (
    <View>
      <Button title="Take a picture" onPress={imageHandler} />
      {image &&
        <Image source={{uri: image}}
        style={{ width: 50, height: 50 }}
        alt='image taken' />}
    </View>
  )
}

const styles = StyleSheet.create({})