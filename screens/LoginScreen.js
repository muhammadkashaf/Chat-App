// import React, {Component} from 'react';
// import firebase from 'firebase';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   AsyncStorage,
// } from 'react-native';
// import styles from '../constants/styles';
// import User from '../User';

// class loginScrean extends Component {
//   static navigationOption = {
//     header: null,
//   };
//   state = {
//     phone: '',
//     name: '',
//   };

//   componentDidMount() {
//     AsyncStorage.getItem('userPhone').then(val => {
//       if (val) {
//         this.setState({phone: val});
//       }
//     });
//   }

//   handleChange = key => val => {
//     this.setState({[key]: val});
//   };

//   handleSubmit = async () => {
//     if (this.state.phone.length < 10) {
//       Alert.alert('Error', 'Wrong phone number');
//     }
//     if (this.state.name.length < 3) {
//       Alert.alert('Error', 'Enter name more than 5 Character');
//     } else {
//       //Save user
//       await AsyncStorage.setItem('userPhone', this.state.phone);
//       User.phone = this.state.phone;
//       firebase
//         .database()
//         .ref('users/' + User.phone)
//         .set({name: this.state.name});
//       this.props.navigation.navigate('Home');
//     }
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.headerTitle}>CHATING APP</Text>
//         <TextInput
//           keyboardType="number-pad"
//           placeholder="Phone number"
//           style={styles.input}
//           onChangeText={this.handleChange('phone')}
//           value={this.state.phone}
//         />
//         <TextInput
//           placeholder="Name"
//           style={styles.input}
//           onChangeText={this.handleChange('name')}
//           value={this.state.name}
//         />
//         <TouchableOpacity onPress={this.handleSubmit}>
//           <Text style={styles.btnTextSubmit}>Submit</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// export default loginScrean;


import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import Button from "../components/Button";
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

function Login({ navigation }) {
  const [number, setNumber] = useState('');
  const [data, setData] = useState([])

  const phoneInput = useRef(null);

  React.useEffect(() => {
    firebase.database().ref('users/').on('value', snapshot => {
      setData(snapshot.val())
    });
  }, [])

  const navigateToHome = () => {
    return navigation.navigate('Home');

  }

  const handleSubmit = async () => {
    // if (number.length < 10) {
    //   Alert.alert('Error', 'Please enter your phone number');
    // }
    if (data.number === number) {
      await AsyncStorage.setItem('userPhone', number);
      navigateToHome();
      alert("Success")
    }
    else {
      Alert.alert("User Not Exists")
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <PhoneInput
        ref={phoneInput}
        defaultValue={number}
        defaultCode="IN"
        onChangeFormattedText={(text) => {
          setNumber(text);
        }}
        containerStyle={styles.phnInput}
        textContainerStyle={styles.containerInput}
        withShadow
      />
      <Button title="Login" onPress={() => handleSubmit()} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.phntext}>Don't Have Account? SignUp</Text>
      </TouchableOpacity>
    </View >
  );
}

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  phnInput: {
    height: '6%',
    //  // width:"80%",
    borderWidth: 1,
    marginTop: height * 0.09,
    borderRadius: 30,
    //   padding:9,
    borderColor: 'lightgrey',
    alignItems: 'center',
    backgroundColor: 'transparent',
    //   justifyContent:"center"
  },
  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  containerInput: {
    backgroundColor: 'transparent',
    paddingTop: 0,
    paddingBottom: 0,
  },
  heading: {
    color: '#006AFF',
    fontSize: 25,
    marginTop: height * 0.1,
    marginLeft: width * -0.2,
    fontWeight: 'bold',
  },
  phntext: {
    color: '#006AFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: height * 0.03,
  },
})