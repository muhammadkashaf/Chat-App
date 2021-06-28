import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import Button from "../components/Button";
import PhoneInput from "react-native-phone-number-input";

import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';



let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

function Register({ navigation }) {
    const phoneInput = useRef(null);

    const [number, setNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('');
    const [imageUri, setImageUri] = useState(null);
    console.log(imageUri, "imageUri****");

    const handleRegister = async () => {
        if (number.length < 10) {
            Alert.alert('Error', 'Please enter your phone number');
        }
        else if (userName.length < 5) {
            Alert.alert('Error', 'Enter name more than 5 Character');
        }
        else {
            //Save user
            await AsyncStorage.setItem('userPhone', number);
            firebase
                .database()
                .ref("users/")
                .push({ number: number, userName: userName, bio: bio, imageUri: imageUri })
            navigation.navigate('Home');
        }
    };


    var options = {
        title: 'Select Image',
        customButtons: [
            {
                name: 'customOptionKey',
                title: 'Choose Photo from Custom Option',
            },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    function fromGallery() {
        launchImageLibrary(options, response => {
            console.log('Response = ', response.uri);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response.uri;
                setImageUri(source)
            }
        });
    }
    const handlePress = () => {
        addInfo(
            userName,
            bio,
            imageUri,
        );
        alert("success1")

    };
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.heading}>Create New Account</Text>

                    <TouchableOpacity onPress={fromGallery}>
                        <Image source={{ uri: imageUri }} style={styles.pic} />
                    </TouchableOpacity>

                    {/* < TouchableOpacity style={styles.icon} >
                        <Icon name="camera" size={20} color="white" />
                    </TouchableOpacity > */}

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

                    <TextInput
                        placeholder="Enter UserName"
                        style={styles.textinput}
                        value={userName}
                        onChangeText={text => setUserName(text)}
                    />
                    <TextInput
                        placeholder="Enter Bio"
                        style={styles.textinput}
                        value={bio}
                        onChangeText={text => setBio(text)}
                    />

                    <Button title="Register" onPress={handleRegister} />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.phntext}>Have Account? SignIn</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </KeyboardAvoidingView >
    );
}

export default Register;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    heading: {
        color: '#006AFF',
        fontSize: 25,
        marginTop: height * 0.08,
        marginLeft: width * -0.2,
        fontWeight: 'bold',
    },
    pic: {
        marginTop: height * 0.02,
        backgroundColor: 'lightgrey',
        height: 120,
        width: 120,
        borderRadius: 60,
    },
    icon: {
        height: 35,
        width: 35,
        borderRadius: 50,
        backgroundColor: 'lightgrey',
        marginLeft: width * 0.2,
        marginTop: height * -0.04,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textinput: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        marginTop: height * 0.03,
        borderRadius: 30,
        padding: 10,
        borderColor: 'lightgrey',
    },
    phntext: {
        color: '#006AFF',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: '20%',
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
})