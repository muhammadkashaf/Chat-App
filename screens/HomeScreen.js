// import React, { Component } from 'react';
// import {
//   Image,
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   AsyncStorage,
// } from 'react-native';

// import firebase from 'firebase';
// import User from '../User';

// export default class HomeScreen extends Component {
//   static navigationOptions = ({ navigation, route }) => ({
//     title: 'Chats',
//     headerLeft: null,
//     headerRight: () => (
//       <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//         <Image
//           source={require('../images/user.png')}
//           style={{ width: 32, height: 32, marginRight: 10 }}
//         />
//       </TouchableOpacity>
//     ),
//   });

//   state = {
//     users: [],
//   };

//   UNSAFE_componentWillMount() {
//     firebase.database().ref('users')
//       .on('child_added', val => {
//         let person = val.val();
//         person.number = val.key;
//         if (person.number === User.phone) {
//           User.name = person.userName;
//         } else {
//           this.setState(prevState => {
//             return {
//               users: [...prevState.users, person],
//             };
//           });
//         }
//       });
//   }

//   _logOut = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate('Auth');
//   };

//   renderRow = ({ item }) => {
//     console.log("item", item)
//     return (
//       <TouchableOpacity
//         onPress={() => this.props.navigation.navigate('Chat')}
//         style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
//         <Text style={{ fontSize: 20 }}>{item}</Text>
//       </TouchableOpacity>
//     );
//   };

//   render() {
//     if (!User.phone) {
//       this.props.navigation.navigate('Auth');
//     }

//     return (
//       <SafeAreaView>
//         <FlatList
//           data={this.state.users}
//           renderItem={this.renderRow}
//           keyExtractor={item => item.number}
//         />
//       </SafeAreaView>
//     );
//   }
// }


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
      {/* {console.log("users===============",users)} */}
      {/* <FlatList data={users} renderItem={(item) => console.log("item", item.key)} /> */}
      {/* {users.users.map(res => console.log("map", map))} */}
    
      {/* {users.users.map(item => {
        console.log(item);
      })} */}
      {/* {console.log(users.users)} */}
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
