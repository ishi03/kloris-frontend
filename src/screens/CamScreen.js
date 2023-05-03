import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FS from 'expo-file-system';
import axios from "axios";
import host from '../HostInfo';

export default function CamScreen() {
  const [image, setImage] = useState(null);
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

    // await toServer({
    //   type: result.type,
    //   base64: result.base64,
    //   uri: result.uri,
    // });

     // ImagePicker saves the taken photo to disk and returns a local URI to it
     let localUri = result.uri;
     let filename = localUri.split('/').pop();

     // Infer the type of the image
     let match = /\.(\w+)$/.exec(filename);
     let type = match ? `image/${match[1]}` : `image`;

     console.log("--->"+result.uri);
      setImage(result.uri);
     // Upload the image using the fetch and FormData APIs
     let formData = new FormData();
     // Assume "photo" is the name of the form field the server expects
     formData.append('photo', { uri: localUri, name: filename, type });

      const response= await fetch(host+`/predict`, {
       method: 'GET',
       body: formData,
       header: {
         'content-type': 'multipart/form-data',
       },
     });

     console.log(response);

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
     
     // ImagePicker saves the taken photo to disk and returns a local URI to it
     let localUri = result.uri;
     let filename = localUri.split('/').pop();

     // Infer the type of the image
     let match = /\.(\w+)$/.exec(filename);
     let type = match ? `image/${match[1]}` : `image`;

     console.log("--->"+result.uri);
      setImage(result.uri);
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

     console.log(response);

     const config={
      header: {
        'content-type': 'multipart/form-data',
      },
     }
     const response1  = await axios.post(host+`/predict`,config);


    //  console.log(response);
     console.log("r1)",response1.data);

}

 const toServer = async (mediaFile) => {
  let type = mediaFile.type;
  let url = "";
  let content_type = "";
  // type === "image"
  //   ? ((route = "/image"), (content_type = "image/jpeg"))
  //   : ((route = "/video"), (content_type = "video/mp4"));
  // url = schema + host + ":" + port + route;
  url = host + `/predict`
  let response = await FS.uploadAsync(url, mediaFile.uri, {
    headers: {
      "content-type": "image/jpeg",
    },
    httpMethod: "POST",
    uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
  });

  console.log(response.headers);
  console.log(response.body);
};

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take a photo" onPress={uploadImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}