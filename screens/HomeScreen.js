import AsyncStorage from '@react-native-community/async-storage'
import * as firebase from 'firebase'
import React, { useEffect, useState } from 'react';

import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'

const HomeScreen = ({ navigation }) => {
  const [users, setUsers] = useState([])

  if (!AsyncStorage.getItem('userPhone')) {
    navigation.navigate("Auth")
  }
  const getAllUsers = () => {
    const array = []
    var ref = firebase.database().ref('users');
    ref.on('value', (snapshot) => {
      Object.values(snapshot.val()).map(res => {
        array.push(res)
        setUsers({ users: array })
      })
    });
  }
  useEffect(() => {
    getAllUsers()
  }, [])

  const _logOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };



  return (
    <SafeAreaView>

      {users.users ? users.users.map((item, index) => {
        console.log("items***", item?.imageUri);
        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('Chat', { item })}
            style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: 150, justifyContent: 'space-around' }}>
              <Image source={{ uri: item.imageUri }} style={{ borderRadius: 25, width: 50, height: 50 }} />
              <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{item.userName}</Text>
            </View>
          </TouchableOpacity>
        )
      })
        :
        <Text style={{ fontSize: 20, color: 'black', justifyContent: 'center', flex: 1, alignItems: 'center' }}>{"No user Found"}</Text>

      }


      <Text onPress={_logOut}>Logout</Text>



    </SafeAreaView>
  )
}

export default HomeScreen
