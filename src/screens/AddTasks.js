import React, { useState } from "react";
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import * as FS from 'expo-file-system';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ImageBackground,
    Button,
    TouchableOpacity,

  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import host from '../HostInfo';

const AddTasks = (props) =>{
    const [info, setInfo] = useState("");
    const [task, setTask] = useState("");
    const [dur, setDur] = useState("");
    const [namee, setName] = useState("");



  // const [camerPermission, setCameraPermission] = useState(false);

//----------------------------------------------------------------------------------------------to upload name of the plant
const submitplant=async()=>{
  const options = {
      headers: {'Content-Type': 'multipart/form-data',
      'x-access-token':await AsyncStorage.getItem('token'),
  },
    };
    var bodyFormData = new FormData();
    // console.log(email,password);
    bodyFormData.append('name', namee);
    bodyFormData.append('task', task);
    bodyFormData.append('dur', dur);
    bodyFormData.append('info', info);


    const data = await axios.post(host+"/uploadplantask",bodyFormData,options); 
    setTitle("");


    props.navigation.navigate("TaskScreen");
}

    const [loaded] = useFonts({
        OpenSans :require('../../assets/fonts/OpenSans-Regular.ttf'),
        Cardo : require('../../assets/fonts/Cardo-Regular.ttf')
      });
    
      if (!loaded) {
        return null;
      };
  
    return(
        <View>
            <View style={styles.title1}>
                <View>
                    <Text style={styles.heading}>Add Task</Text>
                </View>
            </View>

            <View style={styles.inputView}>
            <TextInput
            style={styles.title}
            placeholder="Task"
            placeholderTextColor="#003f5c"
            onChangeText={(task) => setTask(task)}
            value={task}
            />
        </View>


        
        <View style={styles.inputView}>
            <TextInput
            style={styles.title}
            placeholder="Plant Name"
            placeholderTextColor="#003f5c"
            onChangeText={(namee) => setName(namee)}
            value={namee}
            />
        </View>

        <View style={styles.inputView}>
            <TextInput
            style={styles.title}
            placeholder="Duration"
            placeholderTextColor="#003f5c"
            onChangeText={(dur) => setDur(dur)}
            value={dur}
            />
        </View>

            <View style={styles.inputView}>
            <TextInput
            style={styles.title}
            placeholder="Other Info"
            placeholderTextColor="#003f5c"
            onChangeText={(info) => setInfo(info)}
            value={info}
            />
        </View>
      
    <TouchableOpacity onPress={submitplant} style={styles.loginBtn} >
        <Text style={styles.heading}>Submit</Text>
      </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    title: {
          width: "90%",
          height: 45,
          marginBottom: 20,
          marginLeft: "5%",
          alignItems: "flex-start",
          fontSize: 20,
          fontFamily:"OpenSans",
        },
    title1:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily:"OpenSans",
    },
    inputView: {
          borderWidth:1,
          borderRadius: 15,
          width: "95%",
          height: 50,
          marginBottom: "3%",
          marginLeft:"3%",
          marginTop:"5%",
          alignItems: "flex-start",
          fontFamily:"OpenSans"
        },
    inputView2: {
        borderWidth:1,
        borderRadius: 15,
        width: "95%",
        height: 150,
        marginBottom: "3%",
        marginLeft:"3%",
        alignItems: "flex-start",
        // textAlignVertical: 'top',
        fontFamily:"OpenSans"
        },
    TextInput: {
        height: 100,
        width:350,
        flex: 1,
        padding: 10,
        marginLeft: "3%",
        fontSize: 20,
        fontFamily:"OpenSans"
        },
    heading: {
        fontSize: 30,
        marginBottom: "5%",
        marginLeft:"10%",
        fontFamily:"Cardo",
        color:"green"
        },
})

export default AddTasks;