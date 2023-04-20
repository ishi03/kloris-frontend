import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, FlatList } from 'react-native';
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
const PlantScreen = (props) => {
  const [plant1, setPlant1]=useState({});
  const getPlant1=async()=>{
      const config = {
          headers:{
            'x-access-token':await AsyncStorage.getItem('token')
          }
        };
      const response  = await axios.post(host+`/my_plant/`+props.navigation.getParam('_id'),config);
      setPlant1(response.data.plant);
      console.log("----",plant1);
      // var data=JSON.parse(response.data);
      // console.log("row?",response.data.plant);

      console.log("plant?",plant1);
  }
  useEffect(() => {
      getPlant1();
    }, []);  
    const [loaded] = useFonts({
      AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
    });
  
    if (!loaded) {
      return null;
    };

  return <View style={styles.viewStyle}>
    <View style={styles.upperView}>
      <Text style={styles.nameText}>My {plant1.plant_name}</Text>
      <Image source={{uri:plant1.image}} style={styles.image}/>
    </View>

    <View>
      <Text style={styles.headingText}>Notes:</Text>

      <View>
      <FlatList
            horizontal={false}
            showsVerticalScrollIndicator
            data={plant1.notes}
            keyExtractor={note=>note.note_id}
            renderItem={({item})=>{
                return <View style={styles.cardView}>
                    <Text><Text style={{fontWeight:"bold", width:"80%"}}>{item.date}: {"\n"}</Text> {item.note}</Text> 
                    </View>
            }}
            />
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
  fontFamily: 'AlatsiRegular'
},
  headingText:{
    fontSize:18,
    // fontWeight: "bold",
    fontFamily: 'AlatsiRegular',
    marginLeft:"2%",
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

export default PlantScreen;
