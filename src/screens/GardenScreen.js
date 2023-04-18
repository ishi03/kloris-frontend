import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList,TouchableOpacity } from 'react-native';
import GardenCard from '../components/GardenCard';
import plants from '../../dummyData/plants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import host from '../HostInfo';

const GardenScreen = (props) => {

  const [plants1,setPlants1]=useState([]);

  const getPlants= async()=>{
    const t= await AsyncStorage.getItem('token')
    const AuthStr='Bearer '.concat(t)
      const config = {
        headers: {
          'x-access-token':await AsyncStorage.getItem('token'),
          'Authorization': AuthStr
      }
      };
    const response  = await axios.get(host+`/mygarden`,config);
    setPlants1(response.data.plants);
    console.log("----")
    console.log(plants1);
}
  useEffect(() => {
    getPlants();
  }, []);
    return <View style={styles.viewStyle}>
            <Text style={styles.greetingText}>My Garden</Text>
         <View>
                <View style={styles.plantView}>
                <FlatList
                horizontal={false}
                showsVerticalScrollIndicator
                data={plants1}
                keyExtractor={plant=>plant._id}
                renderItem={({item})=>{
                    return <View>
                       <TouchableOpacity onPress={()=>{props.navigation.navigate({routeName:'Plantprofile',params:{_id:item._id}})}}>
                        <GardenCard plant={item}/>
                        </TouchableOpacity>
                        
                        </View>
                }}
                />
                </View>
        </View>

    </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  viewStyle:{
    marginLeft:"5%",
    marginRight:"5%",
    marginTop:"5%",
    height:"100%"
    // marginBottom:"5%",
  },
  greetingText:{
    fontSize:28,
    fontWeight: "bold"
},
plantView:{
    flexDirection:"column",
    height: "80%",
}
});

export default GardenScreen;
