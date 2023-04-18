import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReccCard from '../components/ReccCard';
import axios from 'axios';
import host from '../HostInfo';
import { useFonts } from 'expo-font';
import GardenCard from '../components/GardenCard';
import plants from '../../dummyData/plants';

const ReccScreen = (props) => {
    const [plantrecc, setPlantrecc] = useState([]);
    console.log(props.navigation.getParam('ht'));

    const recc = async () =>{
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
          var bodyFormData = new FormData();
        //   console.log(ht, spread, use, location.coords.latitude, location.coords.longitude);
          bodyFormData.append('light', 'Full Sun');
          bodyFormData.append('height', props.navigation.getParam('ht')); 
          bodyFormData.append('spread', props.navigation.getParam('spread')); 
          bodyFormData.append('usee', props.navigation.getParam('usee')); 
          bodyFormData.append('lat', props.navigation.getParam('lat')); 
          bodyFormData.append('long', props.navigation.getParam('long')); 
  
          const response = await axios.post(host+`/recommendation`,bodyFormData,options); 
          console.log(response.data.recommendation);
          setPlantrecc(response.data.recommendation);
  
        }
        catch(e){
          console.log(e);
        }
      }

      useEffect(()=>{
        recc();
      },[])

      const [loaded] = useFonts({
        Cardo :require('../../assets/fonts/Cardo-Regular.ttf')
      });
    
      if (!loaded) {
        return null;
      };

    return <View style={styles.viewStyle}>
            <Text style={styles.greetingText}>Recommendations</Text>
         <View>
                <View style={styles.plantView}>
                <FlatList
                horizontal={false}
                showsVerticalScrollIndicator
                data={plantrecc}
                keyExtractor={plant=>plant.id}
                renderItem={({item})=>{
                    return <View>
                       <TouchableOpacity onPress={()=>{props.navigation.navigate({routeName:'plantRecc',params:{id:item.id}})}}>
                        <ReccCard plant={item}/>
                        {/* <Text>{item.common_name}</Text> */}
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
    height:957
    // marginBottom:"5%",
  },
  greetingText:{
    fontSize:28,
    // fontWeight: "bold"
    fontFamily: "Cardo",
    // alignSelf: 'flex-start',
    color: "white",
    width: "80%",
    borderRadius: 15,
    height: 45,
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 15,
    paddingLeft:12,
    backgroundColor: "#388000",
},
plantView:{
    flexDirection:"column",
    height: "80%",
    
}
});

export default ReccScreen;

