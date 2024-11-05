import {
  View, TextInput, Text, Button,
  StyleSheet, Modal, Alert, Image
} from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import ImageManager from './ImageManager';


const Input = ({ ifFocus,
  textInputHandler,
  modalHandler,
  modalIfVisible }) => {

  const [text, setText] = useState('');  // State to hold the text input
  const [textCount, setTextCount] = useState(''); // State to hold the text count
  const [isFocused, setIsFocused] = useState(true); // State to hold the focus status
  const [isConfrmDisabled, setIsConfirmDisabled] = useState(true); // State to hold the confirm button status

  useEffect(() => {
    const updateTextCount = () => {
      if (!isFocused) { // If the input is not focused
        if (!text) {
          setTextCount('');
        } else if (text.length >= 3) {
          setTextCount('Thank you');
          setIsConfirmDisabled(false);
        } else {
          setTextCount('Please type more than 3 characters');
        }
      } else {
        setTextCount(text ? text.length.toString() : ''); // If the input is focused
        text.length >= 3 ? setIsConfirmDisabled(false) : setIsConfirmDisabled(true);
      }
    };
    updateTextCount();
  }, [text, isFocused]); // Only re-run the effect if the text or isFocused value changes

  // Function to handle the confirm button
  function handleConfirm() {
    textInputHandler(text);
    setText(''); // Clear the text input in the modal
  };

  // Function to handle the cancel button
  function handleCancel() {
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
          setText(''); // Clear the text input in the modal
        }
      }
    ]
    )
  }

  return (

    <Modal visible={modalIfVisible}
      animationType='slide'
      transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalStyle}>

        {/* images of goal */}
        <Image source={require('../assets/input.png')}
          style={styles.imageStyle}
          alt='An image of goal' />
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }}
          style={[styles.imageStyle, { paddingBottom: 5, marginBottom: 10 }]}
          alt='A same image of goal' />

        {/* Text input */}
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

        <ImageManager />

        {/* Confirm and Cancel buttons */}
        <View style={styles.buttonStyle}>
          <Button title='Cancel'
            onPress={() => handleCancel()}/>
          <Button title='Confirm'
            onPress={() => handleConfirm()}
            disabled={isConfrmDisabled} />
        </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'purple',
    borderWidth: 2,
    padding: 5,
  },
  buttonStyle: {
    flexDirection: 'row',
    paddingRight: 10,
    marginLeft: 5,
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  modalStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: '40%',
    borderRadius: 10,
    padding: 10,
  }
});

export default Input
