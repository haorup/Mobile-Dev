import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { writeToDB } from '../Firebase/firestoreHelper';

export default function GoalUsers({id}) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) {
                throw new Error("HTTP Error! status: " + response.status);
            }
            const data = await response.json();
            data.forEach((user)=> {writeToDB(`goals/${id}/users`, user)})
            setUsers(data.map((user) => {return user.name}));
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
    fetchData();
    }, []);

  return (
    <View>
      <FlatList>
        data={users}
        renderItem={({ item }) => <Text>{item}</Text>}
      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({})
