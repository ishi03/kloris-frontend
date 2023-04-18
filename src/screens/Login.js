import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
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

const Login = (navigation) => {

  const {state, signin} = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
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
  const [loaded] = useFonts({
    AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
    PoppinsMedium :require('../../assets/fonts/Poppins-ExtraLight.ttf')
  });

  if (!loaded) {
    return null;
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
        // fontWeight: "bold",
        fontFamily:"AlatsiRegular",
        color:"#388000"
    },
    tinytext:{
        fontSize:12,
        marginBottom:"5%",
        marginTop:"2%",
        fontFamily:"AlatsiRegular"
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
      width: 250,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      fontFamily: "PoppinsMedium",
    },
   
    forgot_button: {
      height: 30,
      marginBottom: 30,
      fontFamily: "PoppinsMedium",
    },
   
    loginBtn: {
      width: "50%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#388000",
    },

    loginText:{
      fontFamily: "PoppinsMedium",
      color:"white",
      fontSize:15,
      // fontWeight: "bold"
    },

    errorMessage:{
      color:"red"
    }
  });
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
      <ImageBackground source={require("../../assets/bg1.png")} resizeMode="cover" style={styles.image}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.content}>
      <Text style={styles.heading}>Login</Text>
      {/* <Text style={styles.heading}>Account</Text> */}
      <Text style={styles.tinytext}>New Here?  Sign Up</Text>

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
            placeholder="Username"
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
        
        {state.errorMessage?<Text style={styles.errorMessage}>{state.errorMessage}</Text>:null}

        <TouchableOpacity onPress={()=>signin({email, password})} style={styles.loginBtn}>
            <Text style={styles.loginText}>LOG  IN</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
    </View>
  );
};



export default Login;

 
