import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { useState } from 'react'

export default function Maps() {
  const [selectedLocation, setSelectedLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });
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
        <Marker coordinate={selectedLocation} />
      </MapView>


  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})