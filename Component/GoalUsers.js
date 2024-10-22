import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

export default function GoalUsers() {
    const [users, setUsers] = React.useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
            const response = await fetch("https://jsonplaceholder.typicode.com/usersabc");
            if (!response.ok) {
                throw new Error("HTTP Error! status: " + response.status);
            }
            const data = await response.json();

        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
    fetchData();
    }, []);

  return (
    <View>
      <Text>GoalUsers</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
