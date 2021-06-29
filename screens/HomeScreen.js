import AsyncStorage from '@react-native-community/async-storage'
import * as firebase from 'firebase'
import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native'

const HomeScreen = ({ navigation }) => {
  const [users, setUsers] = useState([])

  if (!AsyncStorage.getItem('userPhone')) {
    navigation.navigate("Auth")
  }
const getAllUsers = ()=>{
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
                        return (
                          <TouchableOpacity
                          onPress={()=>navigation.navigate('Chat',{item})}
                          style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                          <Text style={{ fontSize: 20, color: 'black' }}>{item.userName}</Text>
                        </TouchableOpacity>
                        )
                    })
                    :
                    <Text style={{ fontSize: 20, color: 'black' }}>{"NO user Found"}</Text>
                    
                    }


      <Text onPress={_logOut}>Logout</Text>
      


    </SafeAreaView> 
  )
}

export default HomeScreen
