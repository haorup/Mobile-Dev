import { View, TextInput, Text } from 'react-native'
import { useState } from 'react'
import React from 'react'


const Input = () => {
    const [text, setText] = useState('')
  return (
    <View>
      <TextInput
      style={{borderBottomWidth:1, borderBottomColor:'black'}}
      autocorrect={true}
      placeholder='Type here'
      value={text}
      onChangeText={(newText)=>setText(newText)}>
      </TextInput>
      <Text>{text}</Text>
    </View>
  )
}

export default Input