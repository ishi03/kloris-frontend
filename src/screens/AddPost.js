import React, { useState } from "react";
import { useFonts } from 'expo-font';

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

const AddPost = (props) =>{
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const post=async()=>{
        const options = {
            headers: {'Content-Type': 'multipart/form-data',
            'x-access-token':await AsyncStorage.getItem('token'),
        },
          };
          var bodyFormData = new FormData();
          // console.log(email,password);
          bodyFormData.append('question', title);
          bodyFormData.append('bodyy', body); 
          const data = await axios.post(host+"/add_question",bodyFormData,options); 
          setBody("");
          setTitle("");
          props.navigation.navigate("ForumScreen");
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
                    <Text style={styles.heading}>Create Post</Text>
                </View>
            <TouchableOpacity onPress={post}>
            <Image source={require("../../assets/add.png")} style={styles.image}/>
            </TouchableOpacity>
            </View>

            <View style={styles.inputView}>
            <TextInput
            style={styles.title}
            placeholder="Title"
            placeholderTextColor="#003f5c"
            onChangeText={(title) => setTitle(title)}
            value={title}
            />
        </View>

        <View style={styles.inputView2}>
            <TextInput
            style={styles.TextInput} //[styles.TextInput,{height: Math.max(35, ht2)}]
            placeholder="Body"
            placeholderTextColor="#003f5c"
            onChangeText={(body) => setBody(body)}
            value={body}
            multiline={true}
            numberOfLines = {4}
            textAlignVertical={'top'}
            />
        </View>

        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width:30,
        height:30,
        marginRight:"1%",
        marginLeft:"8%",
        // marginTop:"1%"
        // borderRadius:150,
      },
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
        height: 245,
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

export default AddPost;