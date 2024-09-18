import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Header from './Component/Header';
import Input from './Component/Input';
import { useState } from 'react';

export default function App() {
  const appName = 'Mobile Dev';
  const [appVisibility, setAppVisibility] = useState(false);
  const isFocus = true;
  const [text, setText] = useState('');

  function handleInputData(textReceived) {
    console.log(textReceived);
    setText(textReceived);
    setAppVisibility(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName}> </Header>
        <View style={styles.buttonStyle}>
          <Button title='Add a goal'
            onPress={function () { setAppVisibility(true) }}></Button>
        </View>
        <Input modalIfVisible={appVisibility}
          ifFocus={isFocus}
          textInputHandler={handleInputData} />
      </View>

      <View style={styles.bottomView}>
        <Text style={styles.text}>{text}</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'blue',
    fontSize: 20,
  },
  topView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonStyle: {
    width: '30%',
    margin: 3,

  },
  bottomView: {
    flex: 4,
    backgroundColor: '#d5d',
    alignItems: 'center',
  }
});
