import {
  View, TextInput, Text, Button,
  StyleSheet, Modal, Alert
} from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'


const Input = ({ ifFocus,
  textInputHandler,
  modalHandler,
  modalIfVisible }) => {

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

  function handleConfirm() {
    textInputHandler(text);
  };

  function handleCancel() {
    // show an alert
    // ok to dismiss the modal
    // cancel to stay on the modal
    Alert.alert(
      'Cancel input',
      'Modal will be dismissed', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          modalHandler();
        }
      }
    ]


    )
  }

  return (

    <Modal visible={modalIfVisible}
      animationType='slide'>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autocorrect={true}
          placeholder='Type here'
          value={text}
          onChangeText={(newText) => setText(newText)}
          autoFocus={ifFocus}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}>
        </TextInput>
        <Text>{textCount}</Text>
        <Button title='Confirm' onPress={() => handleConfirm()}></Button>
        <Button title='Cancel' onPress={() => handleCancel()}></Button>
      </View>
    </Modal>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'purple',
    borderWidth: 2,
    padding: 5,
  }
});

export default Input