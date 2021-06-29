import AsyncStorage from '@react-native-community/async-storage'
import * as firebase from 'firebase'
import React, { useEffect, useState } from 'react';
import LogoutIcon from 'react-native-vector-icons/AntDesign';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet
} from 'react-native'

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
    navigation.navigate("Auth");
  }
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => _logOut()}>
          <LogoutIcon name="logout" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.subContainer}>
        {users.users ? users.users.map((item, index) => {
          console.log("items***", item.imageUri);
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('Chat', { item })}
              style={styles.usersContainer}>
              <View style={styles.row}>
                <Image source={{ uri: item.imageUri }} style={styles.avater} />
                <Text style={styles.name}>{item.userName}</Text>
              </View>
            </TouchableOpacity>
          )
        })
          :
          <Text style={styles.heading}>{"No user Found"}</Text>

        }
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  subContainer: {
    marginTop: 10
  },
  usersContainer: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1

  },
  row: {
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  avater: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 20,
    color: '#006AFF',
    fontWeight: 'bold'
  },
  heading: {
    fontSize: 20,
    color: 'black',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: "white",
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 40,
    fontWeight: "bold"
  }
})

export default HomeScreen
