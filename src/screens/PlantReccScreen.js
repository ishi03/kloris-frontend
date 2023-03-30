import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import InfoCard from '../components/InfoCard';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import host from '../HostInfo';

const plant={
    "id":4,
    "name":"Aloe Vera",
    "imgSource":require("../../assets/aloevera.jpg"),
    "task":"Watering Time"
}
const PlantReccScreen = (props) => {
    const [plant1, setPlant1]=useState({});
    const getPlant1=async()=>{
        const config = {
            headers:{
              'x-access-token':await AsyncStorage.getItem('token')
            }
          };
        const response  = await axios.post(host+`/excel_row/`+props.navigation.getParam('id'),config);
        setPlant1(response.data.plant);
        console.log("----",response.data, typeof response.data);
        // var data=JSON.parse(response.data);
        // console.log("row?",response.data.plant);

        console.log("plant?",plant1);
    }
    useEffect(() => {
        getPlant1();
      }, []);
    return <View style={styles.viewStyle}>
      {console.log(plant)}
      <View style={styles.upperView}>
        <Text style={styles.nameText}>{plant1.common_name}</Text>
        <Image source={{uri:plant1.image}} style={styles.image}/>
      </View>

      <View>
        <Text style={styles.headingText}>Information</Text>
        <View style={styles.cardView}>
            <Text><Text style={{fontWeight:"bold"}}>Scientific Name:</Text> {plant1.sci_name} {"\n"}
            <Text style={{fontWeight:"bold"}}>Height:</Text> {plant1.height} {"\n"}
            <Text style={{fontWeight:"bold"}}>Spread:</Text> {plant1.spread} {"\n"}
            <Text style={{fontWeight:"bold"}}>Floweing Time:</Text> {plant1.f_time} {"\n"}
            <Text style={{fontWeight:"bold"}}>Soil PH:</Text> {plant1.soilph} {"\n"}
            </Text>

        </View>
      </View>

  </View>
};

const styles = StyleSheet.create({
    cardView:{
        flexDirection:"row",
        backgroundColor:"#D6E8C8",
        marginTop:"5%",
        borderRadius:15,
        padding:"5%",
      },
  nameText:{
    fontSize:28,
    fontWeight: "bold",
    // fontFamily: 'Alatsi-Regular'
},
  headingText:{
    fontSize:18,
    fontWeight: "bold",
    // fontFamily: "Alatsi-Regular"
  },
  image: {
    width:300,
    height:300,
    borderRadius:150,
    // overflow:"hidden",
    borderWidth:2,
    marginTop:"5%",
},
upperView:{
  alignItems: "center",
  paddingTop: "10%",
},
viewStyle:{
  margin:"5%",
}
});

export default PlantReccScreen;
