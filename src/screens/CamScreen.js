import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FS from 'expo-file-system';
import axios from "axios";
import host from '../HostInfo';
import { useFonts } from 'expo-font';

export default function CamScreen({navigation}) {

  const leafimg=require("../../assets/leaf.png")
  const [image, setImage] = useState(null);
  const [pred, setPred] = useState(null);
  // const [camerPermission, setCameraPermission] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 1,
    });

    // console.log(result);

    if (result.cancelled) {
      return;
    }

    let localUri = result.uri;
    await toServer(result.uri);

  };

  const uploadImage = async() =>{

    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    console.log("camera permission???");
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    console.log("uhh");
    console.log(cameraPermission);
    if(cameraPermission.granted===false){
      console.log("camera permission not granted");
      alert("You've refused to allow this app to access your camera!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
       allowsEditing: true,
       aspect: [1, 1],
      //  mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
     });

     if (result.cancelled) {
       return;
     }
     
    await toServer(result.uri);

}

 const toServer = async (result_uri) => {
  let localUri = result_uri;
     let filename = localUri.split('/').pop();

     // Infer the type of the image
     let match = /\.(\w+)$/.exec(filename);
     let type = match ? `image/${match[1]}` : `image`;

     console.log("--->"+result_uri);
      setImage(result_uri);
     // Upload the image using the fetch and FormData APIs
     let formData = new FormData();
     // Assume "photo" is the name of the form field the server expects
     formData.append('photo', { uri: localUri, name: filename, type });

      const response= await fetch(host+`/predict`, {
       method: 'POST',
       body: formData,
       header: {
         'content-type': 'multipart/form-data',
       },
     });
     const x=await response.json();

     console.log("r2)",x["prediction"]);
     setPred(x["prediction"]);
};
 
useEffect(() => {
  const unsubscribe = navigation.addListener('didFocus', () => {
    // The screen is focused
    setImage(null);
    setPred(null);
  });

  // Return the function to unsubscribe from the event so it gets removed on unmount
  return ()=>{unsubscribe};

}, [navigation]);

const [loaded] = useFonts({
  AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
  Cardo :require('../../assets/fonts/Cardo-Regular.ttf')
});

if (!loaded) {
  return null;
};

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"#fff" }}>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take a photo" onPress={uploadImage} /> */}
      {/* {image && <Image source={{ uri: image }} style={styles.img} />} */}
      {image? <Image source={{ uri: image }} style={styles.img} /> : <Image source={ leafimg } style={styles.img} />}
      {pred? <Text style={styles.result}>looks like: {pred}</Text>: image? <Text style={styles.result} > loading... </Text>:<Text style={styles.result} > </Text>}
      
      <TouchableOpacity onPress={pickImage} style={styles.loginBtn} >
        <Text style={styles.heading}>Pick photo from camera roll</Text>
      </TouchableOpacity>
      <Text style={styles.or}>OR</Text>
      <TouchableOpacity onPress={uploadImage} style={styles.loginBtn} >
        <Text style={styles.heading}>Take a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom:10,
    backgroundColor: "#388000",
  },
  heading:{
    fontSize:18,
    // fontWeight: "bold",
    fontFamily:"PoppinsMedium",
    color:"white"
},
  result:{
    marginTop:20,
    marginBottom:20,
    fontFamily: "AlatsiRegular",
    fontSize: 18,
  },
  img:{
    width: 200,
    height: 200
  },
  or:{
    fontFamily: "AlatsiRegular",
    fontSize: 18,
  }
})