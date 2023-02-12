import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
import axios from "axios";
// const axios = require("axios");

const Login = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const onSubmit=()=>{
    console.log("->",email,password);
    axios.post(`http://183.87.244.254:5000/form_login`, { name1: email, pwd: password })
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(error => console.log(error));
  }
 
  const onSubmit2 = async () => {
    try {
      const options = {
        headers: {'Content-Type': 'multipart/form-data'}
      };
      var bodyFormData = new FormData();
      bodyFormData.append('uname', 'hii');
      bodyFormData.append('passwd', 'helloo'); 
      const data = await axios.post("http://192.168.0.103:8000/login",bodyFormData,options); 
      if(data.data === "success"){
        props.navigation.navigate('Task');
      }
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }

  };

  const onSubmit3=async ()=> {
    let response = () => {
      return new Promise(function(resolve, reject) {
        fetch('http://127.0.0.1:8000/form_login', {
          params: {
            username: 'eeshe', password: 'eeshee'
          }
        }).then(response => {
          resolve(response);
        });
      });
    };
    let responseData = await response();
    console.log(responseData.data);
  }

  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
      <ImageBackground source={require("../../assets/bg1.png")} resizeMode="cover" style={styles.image}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.content}>
      <Text style={styles.heading}>Create new</Text>
      <Text style={styles.heading}>Account</Text>
      <Text style={styles.tinytext}>Already Registered? Login</Text>

      {/* <View style={styles.fields}> */}
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Name"
            placeholderTextColor="#003f5c"
            onChangeText={(name) => setName(name)}
            />
        </View>

        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
            />
        </View>
    
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            />
        </View>
    
        <TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
    
        <TouchableOpacity onPress={onSubmit2} style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
    </View>
  );
};

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
  });

export default Login;

 
