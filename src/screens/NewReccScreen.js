import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import host from '../HostInfo';
import { requestForegroundPermissionsAsync } from 'expo-location';
import DropdownComponent from '../components/DropdownComponent';

const NewReccScreen = ({navigation}) => {

    const [err, setErr]=useState(null);
    const startWatching = async () => {
        try {
            const { granted } = await requestForegroundPermissionsAsync();
          if (!granted) {
            throw new Error('Location permission not granted');
          }
          else{
            console.log("location permission granted")
          }
        } catch (e) {
          setErr(e);
        }
      };

    return <View>
        {err? <Text>Please enable location services</Text>:null}
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Height you're looking for"
            placeholderTextColor="#003f5c"
            // onChangeText={}
            />
        </View>

        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Spread you're looking for"
            placeholderTextColor="#003f5c"
            // onChangeText={}
            />
        </View>

        <DropdownComponent/>
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    //   alignItems: "center",
      justifyContent: "center",
    },
    image: {
        flex: 1,
        justifyContent: "center"
      },
    content:{
      alignItems: "center",
    },
    heading:{
        fontSize:30,
        fontWeight: "bold",
        fontFamily:"Roboto",
        color:"#388000"
    },
    tinytext:{
        fontSize:12,
        marginBottom:"5%",
        marginTop:"2%",
    },
    inputView: {
    //   backgroundColor: "#FFC0CB",
      borderWidth:1,
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "flex-start",
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
   
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
   
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#388000",
    },
    errorMessage:{
      color:"red"
    }
  });

export default NewReccScreen;