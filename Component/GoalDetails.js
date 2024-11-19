import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import PressButton from './PressButton';
import { addWarningField } from '../Firebase/firestoreHelper';
import GoalUsers from './GoalUsers';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';

export default function GoalDetails({ navigation, route }) {

  const [isRedColor, setIsRedColor] = useState(false);
  const textStyle = [styles.text, (isRedColor ? styles.redColor : styles.blackColor)];
  const [url, setUrl] = useState('');

  function moreDetailHandler() {
    navigation.push("GoalDetails");
  }

  function warningHandler() {
    let tempGoalId = route?.params?.goalData?.id || 'No ID';
    setIsRedColor(!isRedColor);
    navigation.setOptions({
      title: "Warning",
      headerTintColor: 'red',
    });
    addWarningField('goals', tempGoalId);
  }

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressButton
          passedOnPress={warningHandler}>
          <AntDesign name="warning" size={24} color="black" />
        </PressButton>
      ),
    })
  });

  useEffect( () => {
    async function downloadImageUri() {
      try{
      if (route.params.goalData.imageUri) {
        const reference = ref(storage, route.params.goalData.imageUri);
        const url = await getDownloadURL(reference);
        setUrl(url);
      }
    } catch (error) {
      console.error('Error downloading image: ', error);
    }
  }
   downloadImageUri();
  }
  , []);


    return (
      <View>
        {route.params ? (
          <View>
            <Text style={textStyle}>
              Goal Details: {route.params.goalData.text} {'\n'}
            </Text>
            {route.params.goalData.id && <Text style={textStyle}>
              Goal ID: {route.params.goalData.id} {'\n'}
            </Text>}
            <Button title="More Details" color={isRedColor ? 'red' : 'blue'}
              onPress={moreDetailHandler} />
            <GoalUsers id={route.params.goalData.id} />
            {url && <Image
              style={styles.imageStyle}
              source={{ uri: url }}
            />}
          </View>
        ) : (
          <Text style={textStyle}>No more Details</Text>
        )}</View>
    )
  }

const styles = StyleSheet.create({
    text: {
      fontSize: 20,
      padding: 5,
      alignSelf: 'center',
    },
    blackColor: {
      color: 'black',
    },
    redColor: {
      color: 'red',
    },
    imageStyle: {
      width: 100,
      height: 100,
      alignSelf: 'center',
    }
  })