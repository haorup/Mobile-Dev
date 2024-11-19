import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, Alert } from 'react-native';
import Header from './Header';
import Input from './Input';
import { useEffect, useState } from 'react';
import GoalItem from './GoalItem';
import LineSeparator from './LineSeparator';
import PressButton from './PressButton';
import { writeToDB, deleteDB, deletaAllDB } from '../Firebase/firestoreHelper';
import { onSnapshot, collection, where } from 'firebase/firestore';
import { auth, database, storage } from '../Firebase/firebaseSetup';
import { query } from 'firebase/firestore';
import { ref, uploadBytesResumable } from 'firebase/storage';


export default function App({ navigation }) {
  const appName = 'Mobile Dev';
  const [appVisibility, setAppVisibility] = useState(false);
  const isFocus = true;
  // const [text, setText] = useState('');
  const [arrOfGoal, setArrOfGoal] = useState([]);

  async function fetchAndUploadImage(uri) {
    console.log('this is the uri', uri);
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      return uploadResult.ref.fullPath;
    } catch (error) {
      console.error(error);
    }
  }

  // function called when the user confirms the input
  async function handleInputData(data) {
    // writing data into the database
    let newData = { text: data.text };
    let uri = '';
    if (data.imageUri) {
      uri = await fetchAndUploadImage(data.imageUri);
    }
    newData = { ...newData, owner: auth.currentUser.uid };
    if (uri) {
      newData = { ...newData, imageUri: uri };
    }
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
          }
        }
      ]);
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      // update the listner to the goals collection
      query(collection(database, 'goals'),
        where('owner', '==', auth.currentUser.uid)),
      (queryShot) => {
        let newArr = [];
        let newEntry = {};
        queryShot.forEach((docSnapshot) => {
          newEntry = docSnapshot.data();
          newEntry = { ...newEntry, id: docSnapshot.id };
          newArr.push(newEntry);
        });
        setArrOfGoal(newArr);
      });
    return () => {
      unsubscribe(); // unsubscribe from the snapshot
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName}> </Header>
        <View style={styles.buttonStyle}>
          <PressButton
            passedOnPress={() => { setAppVisibility(true) }}
            componentStyle={{ backgroundColor: 'green', borderRadius: 5, alignItems: 'center' }}>
            <Text style={{ color: 'white', padding: 5 }}>Add a Goal</Text>
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
          ListHeaderComponent={arrOfGoal.length > 0
            && (<Text style={styles.flatListProp}>
              My Goals List</Text>)}
          ListFooterComponent={arrOfGoal.length > 0
            && (<Button title='Delete all'
              onPress={() => { handleDeleteAll() }} />)}
          ItemSeparatorComponent={({ highlighted }) => (<LineSeparator passedHighlighted={highlighted} />)}
          renderItem={({ item, separators }) => {
            return (
              <GoalItem
                passedSeparator={separators}
                goalObj={item}
                goalDeleteHandler={handleDeleteGoal}
                passedNavigation={navigation} />
            )
          }} />

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
