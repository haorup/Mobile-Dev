import React from 'react'
import { View } from 'react-native'

export default function LineSeparator({passedHighlighted}) {
  console.log(passedHighlighted);
  return (
    <View style={{
      borderColor: passedHighlighted ? 'red' : 'black',
      borderWidth: 2,
      marginVertical: 5,
    }} />
  )
}
