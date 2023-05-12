import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useFonts } from 'expo-font';
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
    const [sunlight, setSunlight]=useState("");

    const useopn = [
      { label: 'Medicinal Herb', value: 'Medicinal Herb' },
      { label: 'Vegetable', value: 'Vegetable' },
      { label: 'Cut Flower', value: 'Cut Flower' },
      { label: 'Any', value: '' },
  
    ];

    const sunlightopn = [
      { label: 'Full Sun', value: 'Full Sun' },
      { label: 'Full Sun to Partial Shade', value: 'Full Sun to Partial Shade' },
      { label: 'Partial Shade', value: 'Partial Shade or Dappled Shade' },
      { label: 'Partial Shade to Full Shade', value: 'Partial Shade to Full Shade' },
      { label: 'Partial Shade to Full Shade', value: 'Partial Shade to Full Shade' },
      { label: 'Any', value: '' },
  
    ];

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

    const recc = async ({ht, spread, use, sunlight}) =>{
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
        var lat=0;
        var long=0;
        console.log(ht, spread, use, location.coords.latitude, location.coords.longitude);
        bodyFormData.append('light', sunlight);
        bodyFormData.append('height', ht); 
        bodyFormData.append('spread', spread); 
        bodyFormData.append('usee', use);
        if(location!==null){
          lat=location.coords.latitude;
          long=location.coords.longitude;
        } 
         else{
          lat=19.02;
          long=17.23;
         }
         bodyFormData.append('lat', lat); 
         bodyFormData.append('long', long);
        const response = await axios.post(host+`/recommendation`,bodyFormData,options); 
        console.log(response.data.recommendation)
        setHt("");
        setSpread("");
        setUse(null);
        setSunlight(null);
        navigation.navigate({routeName:'recommendations',
        params:{
          ht:ht,
          spread:spread,
          usee:use,
          sunlight:sunlight,
          lat:lat,
          long:long
           }})

      }
      catch(e){
        console.log(e);
      }
    }

    const newrecc = async () =>{
      try{
        const t= await AsyncStorage.getItem('token')
        const AuthStr='Bearer '.concat(t)
        const options = {
          headers: {
            'x-access-token':await AsyncStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
            'Authorization': AuthStr
        }
        };
        navigation.navigate({routeName:'newRecommendations'})

      }
      catch(e){
        console.log(e);
      }
    }


    useEffect(()=>{
      startWatching();
      getLocation();
    },[])
    const [loaded] = useFonts({
      AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
      PoppinsMedium :require('../../assets/fonts/Poppins-ExtraLight.ttf')

    });
  
    if (!loaded) {
      return null;
    };
    
    return <View style={styles.container} >
        {err? <Text>Please enable location services</Text>:null}

        <View style={styles.promptView}>
          <Text style={styles.tinytext}>Don't have any plants yet?</Text>
          <Text style={styles.tinytext}>Get Recommendations by filling up the form below</Text>

        </View>

        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Height in feet"
            placeholderTextColor="#003f5c"
            onChangeText={(ht)=>{setHt(ht)}}
            value={ht}
            />
        </View>

        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Spread in feet"
            placeholderTextColor="#003f5c"
            onChangeText={(spread)=>{setSpread(spread)}}
            value={spread}
            />
        </View>

        <DropdownComponent addUse={setUse} data={useopn} placeholder='Select Use'/>

        <DropdownComponent addUse={setSunlight} data={sunlightopn} placeholder='Sunlight'/>


        <TouchableOpacity onPress={()=>recc({ht, spread, use, sunlight})} style={styles.loginBtn} >
        <Text style={styles.heading}>Get Recommendations</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', alignItems: 'center', width:"85%"}}>
          <View style={{flex: 1, height: 1, backgroundColor: '#D3DBDF'}} />
            <Text style={styles.or}>OR</Text>
          <View style={{flex: 1, height: 1, backgroundColor: '#D3DBDF'}} />
        </View>

        <Text style={styles.tinytext}>Get recommendations based on existing plants</Text>
        <TouchableOpacity onPress={()=>newrecc()} style={styles.loginBtn} >
        <Text style={styles.heading}> Lets Go ! </Text>
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
    content:{
      alignItems: "center",
    },
    tinytext:{
      fontSize:12,
      // marginBottom:"5%",
      // marginTop:"2%",
      fontFamily:"AlatsiRegular",
      color:"#388000"
  },
    heading:{
        fontSize:18,
        // fontWeight: "bold",
        fontFamily:"PoppinsMedium",
        color:"white"
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
    promptView: {
        // backgroundColor: "#FFC0CB",
        width: "70%",
        height: 55,
        paddingBottom:10,
        marginBottom:15,
        alignItems: "center",
      },
   
    TextInput: {
      height: 50,
      width:200,
      flex: 1,
      // padding: 10,
      marginLeft: 20,
      fontFamily:"PoppinsMedium"
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
    Prompt: {
      width: "70%",
      borderRadius: 50,
      height: 75,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 50,
      backgroundColor: "#388000",
    },
    errorMessage:{
      color:"red"
    }, 
    or:{width:50, 
      textAlign:'center', 
      fontSize:12, 
      fontFamily:"AlatsiRegular",
      color:"black",
      marginTop: 15,
      marginBottom: 15, 
    }
  });

export default NewReccScreen;