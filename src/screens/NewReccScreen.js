import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import host from '../HostInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import DropdownComponent from '../components/DropdownComponent';

const NewReccScreen = ({navigation}) => {

    const [err, setErr]=useState(null);
    const [ht, setHt]=useState("");
    const [spread, setSpread]=useState("");
    const [location, setLocation] = useState(null);
    const [use, setUse]=useState(null);

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

    const getLocation = async () => {
      try {
        let location = await getCurrentPositionAsync({});
        setLocation(location);
        console.log(location);
      } catch (e){
        console.log(e);
      }
    }

    const recc = async ({ht, spread, use}) =>{
      try{
        const t= await AsyncStorage.getItem('token')
        console.log(t)
        const AuthStr='Bearer '.concat(t)
        const options = {
          headers: {
            'x-access-token':await AsyncStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
            'Authorization': AuthStr
        }
        };
        var bodyFormData = new FormData();
        console.log(ht, spread, use, location.coords.latitude, location.coords.longitude);
        bodyFormData.append('light', 'Full Sun');
        bodyFormData.append('height', ht); 
        bodyFormData.append('spread', spread); 
        bodyFormData.append('usee', use); 
        bodyFormData.append('lat', location.coords.latitude); 
        bodyFormData.append('long', location.coords.longitude); 

        const response = await axios.get(host+"/recommendation",bodyFormData,options); 
        console.log(response.data.recommendation)
      }
      catch(e){
        console.log(e);
      }
    }

    useEffect(()=>{
      startWatching();
      getLocation();
    },[])

    return <View style={styles.container} >
        {err? <Text>Please enable location services</Text>:null}
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Height you're looking for"
            placeholderTextColor="#003f5c"
            onChangeText={(ht)=>{setHt(ht)}}
            />
        </View>

        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Spread you're looking for"
            placeholderTextColor="#003f5c"
            onChangeText={(spread)=>{setSpread(spread)}}
            />
        </View>
        <DropdownComponent addUse={setUse}/>
        <TouchableOpacity onPress={()=>recc({ht, spread, use})} style={styles.loginBtn} >
        <Text style={styles.loginText}>Get Recommendations</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
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
      width: "70%",
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