import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'

export default function Maps() {
  return (
    <View>
      <MapView
    style={styles.map}
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
    </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    }
})