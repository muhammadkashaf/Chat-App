import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from "firebase";

//Components
import Loader from '../components/Loader';
import PhoneInput from "react-native-phone-number-input";
import Button from "../components/Button";

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

function Login({ navigation }) {
  const [number, setNumber] = useState('');
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const phoneInput = useRef(null);

  console.log("data", data);

  const getAllUsers = () => {
    const array = []
    firebase.database().ref('users').on('value', snapshot => {
      Object.values(snapshot.val()).map(res => {
        array.push(res)
        setData({ data: array })
      })
    });
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const navigateToHome = () => {
    return navigation.navigate('Home');
  }

  const handleSubmit = async () => {
    setLoading(true);
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].number === number) {
        setLoading(false);
        await AsyncStorage.setItem('userPhone', number);
        navigateToHome();
      }
      else {
        setLoading(false);
      }
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
      />

      {!loading ? (
        <Button title="Login" onPress={() => handleSubmit()} />
      ) : (<Loader />)}

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
    height: "8%",
    borderWidth: 1,
    marginTop: height * 0.09,
    borderRadius: 30,
    borderColor: 'lightgrey',
    alignItems: 'center',
    backgroundColor: 'transparent',
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