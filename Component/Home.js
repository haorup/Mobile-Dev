import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import Header from './Header';
import Input from './Input';
import { useEffect, useState } from 'react';
import GoalItem from './GoalItem';
import LineSeparator from './LineSeparator';
import PressButton from './PressButton';
import {writeToDB, deleteDB, deletaAllDB} from '../Firebase/firestoreHelper';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { database } from '../Firebase/firebaseSetup';


export default function App({ navigation }) {
  const appName = 'Mobile Dev';
  const [appVisibility, setAppVisibility] = useState(false);
  const isFocus = true;
  // const [text, setText] = useState('');
  const [arrOfGoal, setArrOfGoal] = useState([]);

  // function called when the user confirms the input
  function handleInputData(textReceived) {

    // writing data into the database
    let newData = {text: textReceived};
    writeToDB('goals', newData);
    setAppVisibility(false);
  }

  // function called when the user cancels the input
  function handleCancelInput() {
    console.log("input cancelled");
    setAppVisibility(false);
  }

  // function to delte a goal
  function handleDeleteGoal(goalId) {
    console.log(goalId);
    deleteDB(goalId, 'goals');
    // setArrOfGoal((prevGoal) => {
    //   return prevGoal.filter((goal) => goal.id !== goalId);
    // });
    // deleteDB(goalId, 'goals');
  }

  // function to delete all goals
  function handleDeleteAll() {
    console.log("Delete all goals");
    Alert.alert(
      "Delete all goals",
      "Do you want to delete all goals?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            deletaAllDB('goals');
            // setArrOfGoal([]);
          }
        }
      ]);
  }

  useEffect(() => {
    onSnapshot(collection(database, 'goals'),
    (queryShot) => {
      let newArr = [];
      let newEntry = {};
      queryShot.forEach((docSnapshot) => {
        // console.log(docSnapshot.data());
        newEntry = docSnapshot.data();
        newEntry = {...newEntry, id: docSnapshot.id};
      newArr.push(newEntry);});
      setArrOfGoal(newArr);
    })}, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName}> </Header>
        <View style={styles.buttonStyle}>
            <PressButton
            passedOnPress={() => {setAppVisibility(true)}}
            componentStyle={{backgroundColor: 'green', borderRadius:5, alignItems:'center'}}>
              <Text style={{color: 'white', padding: 5}}>Add a Goal</Text>
            </PressButton>
        </View>
        <Input modalIfVisible={appVisibility}
          ifFocus={isFocus}
          textInputHandler={handleInputData}
          modalHandler={handleCancelInput} />
      </View>

      <View style={styles.bottomView}>
        {/* using FlatList */}
        <FlatList data={arrOfGoal}
                  contentContainerStyle={styles.scrollViewStyle}
                  ListEmptyComponent={<Text style={styles.flatListProp}>
                    No Goals to show</Text>}
                  ListHeaderComponent={ arrOfGoal.length > 0
                    && (<Text style={styles.flatListProp}>
                    My Goals List</Text>)}
                  ListFooterComponent={ arrOfGoal.length > 0
                    && (<Button title='Delete all'
                      onPress={() => {handleDeleteAll()}}/>)}
                  ItemSeparatorComponent={<LineSeparator/>}
                  renderItem={({item}) => {
                    // console.log("goalObj:", goalObj);
                    return (
                      <GoalItem goalObj={item}
                                goalDeleteHandler={handleDeleteGoal}
                                passedNavigation={navigation}/>
                    )
                  }}/>

        {/* <ScrollView contentContainerStyle={styles.scrollViewStyle}
          bounces={true}>
          {arrOfGoal.map((goal) => {
            return (
              <View key={goal.id}
                style={styles.textBackgroundStyle}>
                <Text style={styles.text}>{goal.text}</Text>
              </View>)
          })}
        </ScrollView> */}
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
  },
  flatListProp: {
    color: 'black',
    fontSize: 20,
    padding: 5,
    margin: 5,
  }
});
