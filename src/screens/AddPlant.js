import React, { useState } from "react";
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import * as FS from 'expo-file-system';
import Icon from "react-native-vector-icons/FontAwesome";
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

const AddPlant = (props) =>{
    const [title, setTitle] = useState("");
    const [namee, setName] = useState("");
    const [image, setImage] = useState(null);
  const leafimg=require("../../assets/plantplaceholder.png")
  // const [camerPermission, setCameraPermission] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
        console.log("--->"+result.uri);
      setImage(result.uri);
    }

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
       aspect: [4, 3],
      //  mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
     });

     if (result.cancelled) {
       return;
     }

     if (!result.canceled) {
      console.log("--->"+result.uri);
    setImage(result.uri);
  }
      // await toServer({
      //   type: result.type,
      //   base64: result.base64,
      //   uri: result.uri,
      // });
    
      let localUri = result.uri;
        let filename = localUri.split('/').pop();
   
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;


        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('photo', { uri: localUri, name: filename, type });
   
         const response= await fetch(host+`/uploadplantpic`, {
          method: 'POST',
          body: formData,
          header: {
            'content-type': 'multipart/form-data',
          },
        });
      setImage(result.uri);
}


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
    bodyFormData.append('type', title);

    const data = await axios.post(host+"/uploadplantname",bodyFormData,options); 
    setTitle("");


    props.navigation.navigate("GardenScreen");
}

    const [loaded] = useFonts({
      AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
      PoppinsMedium :require('../../assets/fonts/Poppins-ExtraLight.ttf'),
      });
    
      if (!loaded) {
        return null;
      };
  
    return(
        <View style={styles.container}>
          <TouchableOpacity onPress={()=>{props.toggleModal()}}>
          <Icon name="close" color="#388000" size={32} style={styles.close}/>
          </TouchableOpacity>
            <View style={styles.title1}>
                <View>
                    <Text style={styles.heading}>Add Plant</Text>
                </View>
            </View>
    {image? <Image source={{ uri: image }} style={styles.img} /> : <Image source={leafimg} style={styles.img} />}
    <View style={{width:"45%"}}>
        <View style={styles.imagebtns}>
          <TouchableOpacity onPress={pickImage} >
              <Icon name="upload" color="#388000" size={32} style={styles.image}/>
            </TouchableOpacity>
            <Text>OR</Text>
            <TouchableOpacity onPress={uploadImage}  >


              <Icon name="camera" color="#388000" size={32} style={styles.image}/>
            </TouchableOpacity>
        </View>
    </View>     
            <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Nickname"
            placeholderTextColor="#003f5c"
            onChangeText={(namee) => setName(namee)}
            value={namee}
            />
        </View>

            <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Type"
            placeholderTextColor="#003f5c"
            onChangeText={(title) => setTitle(title)}
            value={title}
            />
        </View>
         
    <TouchableOpacity onPress={submitplant} style={styles.loginBtn} >
        <Text style={{fontFamily:"PoppinsMedium", color:"white", fontSize:18}}>Submit</Text>
      </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    image: {
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
          fontFamily:"PoppinsMedium",
        },
    title1:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily:"PoppinsMedium",
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
        height: 100,
        width:350,
        flex: 1,
        padding: 10,
        marginLeft: "3%",
        fontSize: 15,
        fontFamily:"PoppinsMedium"
        },
    heading: {
        fontSize: 30,
        marginBottom: "5%",
        marginLeft:"10%",
        fontFamily:"AlatsiRegular",
        color:"#388000",
        },
        imagebtns:{
          flexDirection:"row",
          justifyContent: "space-between",
          alignItems:"center",
          marginBottom:10
          // width:"50%",
          // marginLeft:20
        },
        img:{
          width:180,
          height:180,
          borderRadius:90,
          overflow:"hidden",
          borderWidth:2,
          margin:8,
        },
        container: {
          // flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:"white",
          paddingBottom:"20%",
          paddingTop:"10%"
          // height:120,
        },
        loginBtn: {
          width: "70%",
          borderRadius: 25,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          backgroundColor: "#388000",
        },
        close:{
          marginLeft:"70%",
          // marginTop:"1%"
        }
})

export default AddPlant;