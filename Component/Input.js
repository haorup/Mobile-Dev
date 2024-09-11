import { View, TextInput, Text } from 'react-native'
import { useState, useRef } from 'react'
import React from 'react'


const Input = (prop) => {
  const [text, setText] = useState('');
  const ifTextInputFocus = useRef();

  const handleTextCount = () => {
    if (!ifTextInputFocus.current || !(ifTextInputFocus.current.isFocused())) {
      return '';
    } else {
      if (text) {
        return text.length;
      } else {
        return '';
    }
  }
}

  return (
    <View>
      <TextInput
        ref={ifTextInputFocus}
        style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}
        autocorrect={true}
        placeholder='Type here'
        value={text}
        onChangeText={(newText) => setText(newText)}
        autoFocus={prop.ifFocus}>
      </TextInput>
      <Text>{text}</Text>
      <Text>{handleTextCount()}</Text>
    </View>
  )
}

export default Input