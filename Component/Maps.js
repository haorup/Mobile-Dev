import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Maps() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();

  function confirmLocationHandler() {
    navigation.navigate('ProfileScreen', {selectedLocation})

  }

  return (
      <MapView
        onPress={(event) => {
          setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
          })
        }}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        { selectedLocation && <Marker coordinate={selectedLocation} />}
        <Button title='Confirm Selected Location' onPress={confirmLocationHandler}></Button>
      </MapView>



  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})