import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView } from 'react-native';
import Header from './Component/Header';
import Input from './Component/Input';
import { useState } from 'react';

export default function App() {
  const appName = 'Mobile Dev';
  const [appVisibility, setAppVisibility] = useState(false);
  const isFocus = true;
  const [text, setText] = useState('');
  const [arrOfGoal, setArrOfGoal] = useState([]);

  // function called when the user confirms the input
  function handleInputData(textReceived) {
    console.log("input text:", textReceived);
    // add the textReceived to the array of goals
    let newGoal = { text: textReceived, id: Math.random() };
    setArrOfGoal((prevGoal) => { return [...prevGoal, newGoal] });
    console.log("array of goals:", arrOfGoal);

    // setText(textReceived);
    setAppVisibility(false);
  }

  // function called when the user cancels the input
  function handleCancelInput() {
    console.log("input cancelled");
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
          textInputHandler={handleInputData}
          modalHandler={handleCancelInput} />
      </View>

      <View style={styles.bottomView}>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}
          bounces={true}>
          {arrOfGoal.map((goal) => {
            return (
              <View key={goal.id}
                style={styles.textBackgroundStyle}>
                <Text style={styles.text}>{goal.text}</Text>
              </View>)
          })}
        </ScrollView>
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
    padding: 50,
  },
  textBackgroundStyle: {
    backgroundColor: 'yellow',
    borderRadius: 5,
    margin: 5,
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
    // alignItems: 'center',
  },
  scrollViewStyle: {
    alignItems: 'center',
  }
});
