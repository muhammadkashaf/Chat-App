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
import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native'

const HomeScreen = ({ navigation }) => {
  const [users, setUsers] = React.useState([])
  console.log("users****", users);

  if (!AsyncStorage.getItem('userPhone')) {
    navigation.navigate("Auth")
  }

  React.useEffect(() => {
    var ref = firebase.database().ref('users');

    ref.on('value', (snapshot) => {
      Object.values(snapshot.val()).map(res => {
        console.log("values", res);
        setUsers({ users: res })
      })
    });
  }, [])

  const _logOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };



  return (
    <SafeAreaView>
      {/* <FlatList data={users} renderItem={(item) => console.log("item", item.key)} /> */}
      {/* {users.users.map(res => console.log("map", map))} */}

      {users.users.map(item => {
        console.log(item);
      })}
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Chat')}
        style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
        <Text style={{ fontSize: 20, color: 'black' }}>{ }</Text>
      </TouchableOpacity>

      <Text onPress={_logOut}>Logout</Text>


    </SafeAreaView>
  )
}

export default HomeScreen
