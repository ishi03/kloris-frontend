import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

const Login = () => {
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
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
    
        <TouchableOpacity style={styles.loginBtn}>
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

 
