import { View, TextInput, Text, Button } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import React from 'react'


const Input = (prop) => {
  const [text, setText] = useState('');
  const [textCount, setTextCount] = useState('');
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const updateTextCount = () => {
      if (!isFocused) { // If the input is not focused
        if (!text) {
          setTextCount('');
        } else if (text.length >= 3) {
          setTextCount('Thank you');
        } else {
          setTextCount('Please type more than 3 characters');
        }
      } else {
        setTextCount(text ? text.length.toString() : ''); // If the input is focused
      }
    };
    updateTextCount();
  }, [text, isFocused]); // Only re-run the effect if the text or isFocused value changes


  const handleConfirm = (text) => {
    console.log(text);
  };

  return (
    <View>
      <TextInput
        style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}
        autocorrect={true}
        placeholder='Type here'
        value={text}
        onChangeText={(newText) => setText(newText)}
        autoFocus={prop.ifFocus}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}>
      </TextInput>
      <Text>{textCount}</Text>
      <Button title='Confirm' onPress={() => handleConfirm()}></Button>
    </View>
  )
}

export default Input