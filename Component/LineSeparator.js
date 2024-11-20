import React from 'react'
import { View } from 'react-native'

export default function LineSeparator({passedHighlighted}) {
  return (
    <View style={{
      borderColor: passedHighlighted ? 'red' : 'black',
      borderWidth: 2,
      marginVertical: 5,
    }} />
  )
}
