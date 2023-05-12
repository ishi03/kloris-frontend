import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import InfoCard from '../components/InfoCard';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import host from '../HostInfo';


const SearchPlant = (props) => {
    const [plant1, setPlant1]=useState({});
    const getPlant1=async()=>{
        const config = {
            headers:{
              'x-access-token':await AsyncStorage.getItem('token')
            }
          };
        console.log(typeof props.navigation.getParam('id'))
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

      const [loaded] = useFonts({
        AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
        OpenSans :require('../../assets/fonts/OpenSans-Regular.ttf')
      });
    
      if (!loaded) {
        return null;
      };

    return <View style={styles.viewStyle}>
      <View style={styles.upperView}>
        <Text style={styles.nameText}>{plant1.common_name}</Text>
        <Image source={{uri:plant1.image}} style={styles.image}/>
      </View>

      <View>
        <Text style={styles.headingText}>Information</Text>
        <View style={styles.cardView}>
            <Text style={styles.infoText}><Text style={{fontFamily: 'AlatsiRegular',fontSize:16}}>Scientific Name :</Text> {plant1.sci_name} {"\n"}
            <Text style={{fontFamily: 'AlatsiRegular',fontSize:16}}>Height (in feet) :</Text> {plant1.height} {"\n"}
            <Text style={{fontFamily: 'AlatsiRegular',fontSize:16}}>Spread (in feet) :</Text> {plant1.spread} {"\n"}
            <Text style={{fontFamily: 'AlatsiRegular',fontSize:16}}>Flowering Time :</Text> {plant1.f_time} {"\n"}
            <Text style={{fontFamily: 'AlatsiRegular',fontSize:16}}>Soil pH :</Text> {plant1.soilph} {"\n"}
            </Text>

        </View>
      </View>

  </View>
};

const styles = StyleSheet.create({
    cardView:{
        flexDirection:"row",
        backgroundColor:"#D6E8C8",
        marginTop:"2%",
        borderRadius:15,
        padding:"3%",
      },
  nameText:{
    fontSize:27,
    // fontWeight: "bold",
    fontFamily: 'AlatsiRegular',
},
  headingText:{
    fontSize:20,
    fontFamily: "AlatsiRegular",
    marginTop:"2%",
    marginLeft:"2%"
  },
  infoText:{
    fontSize:15,
    fontFamily: "OpenSans",
    // marginTop:"2%",
    // marginLeft:"2%"
  },
  image: {
    width:300,
    height:300,
    borderRadius:150,
    // overflow:"hidden",
    borderWidth:2,
    marginTop:"2.5%",
},
upperView:{
  alignItems: "center",
  // marginTop: "1%",
},
viewStyle:{
  margin:"5%",
}
});

export default SearchPlant;
