import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput,Text, View } from 'react-native';
import  Header  from './Component/Header';
import { useState } from 'react';

export default function App() {
  const appName = 'Mobile Dev';
  const [text, setText] = useState('')
  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <Header name={appName} version='2' author='Hao'/>
      <TextInput
      style={{height:40}}
      autocorrect={true}
      placeholder='Type here'
      value={text}
      onChangeText={(newText)=>setText(newText)}>
      </TextInput>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
