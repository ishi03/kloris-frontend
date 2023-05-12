import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
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
import { Context as AuthContext } from "../context/AuthContext";

const Register = ({navigation}) => {

  const {state, signup} = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  
  // const onSubmit = async () => {
  //   try {
  //     const options = {
  //       headers: {'Content-Type': 'multipart/form-data'}
  //     };
  //     var bodyFormData = new FormData();
  //     // console.log(email,password);
  //     bodyFormData.append('uname', email);
  //     bodyFormData.append('passwd', password); 
  //     const data = await axios.post("http://192.168.0.103:8000/login",bodyFormData,options); 
  //     // if(data.data === "success"){
  //     //   props.navigation.navigate('Task');
  //     // }
  //     console.log("->",data.data);
  //     console.log("-->",JSON.parse(data.data));
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };
 
  // const onSubmit2 = async () => {
  //   try {
  //     const options = {
  //       headers: {'Content-Type': 'multipart/form-data'}
  //     };
  //     var bodyFormData = new FormData();
  //     // console.log(email,password);
  //     bodyFormData.append('uname', email);
  //     bodyFormData.append('passwd', password); 
  //     const data = await axios.post("http://192.168.0.101:8000/login",bodyFormData,options); 
  //     if(typeof data.data['token'] !== "undefined"){
  //       // localStorage.setItem("jwtToken", data.data['token']);
  //       props.navigation.navigate('Task');
  //     }
  //     console.log("-->",data.data['token']);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };
  // console.log(state);

  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
      <ImageBackground source={require("../../assets/bg1.png")} resizeMode="cover" style={styles.image}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.content}>
      <Text style={styles.heading}>Register</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('login')}>
      <Text style={styles.tinytext}>Already Registered? Log In</Text>
      </TouchableOpacity>
      {/* <View style={styles.fields}> */}
        {/* <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Name"
            placeholderTextColor="#003f5c"
            onChangeText={(name) => setName(name)}
            />
        </View> */}

        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Name"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(name) => setName(name)}
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

        
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            onChangeText={(password2) => setPassword2(password2)}
            />
        </View>
        
        {state.errorMessage?<Text style={styles.errorMessage}>{state.errorMessage}</Text>:null}

        <TouchableOpacity onPress={()=>signup({name, password, password2})} style={styles.loginBtn}>
            <Text style={styles.loginText}>REGISTER</Text>
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
    errorMessage:{
      color:"red"
    }
  });

export default Register;