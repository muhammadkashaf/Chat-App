import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;


function Button({ title, onPress, myHi }) {
    const [message, setMessage] = useState('6.5%');
    useEffect(() => {

        //  if(myHi){
        //     setMessage(myHi)
        //  }

    });
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { height: message }]}>
            <Text style={{ fontSize: 16, color: "white", textAlign: 'center' }}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button;
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#006AFF",
        width: "70%",
        height: 30,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: height * 0.05,
        // marginBottom: "20%"
    },
})