import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput,Text, View } from 'react-native';
import  Header  from './Component/Header';
import Input from './Component/Input';
import { useState } from 'react';

export default function App() {
  const appName = 'Mobile Dev';
  const isFocus = true;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} version='2' author='Hao'/>
      <Input ifFocus={isFocus}/>
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
