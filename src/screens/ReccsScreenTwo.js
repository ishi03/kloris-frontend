import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReccCard from '../components/ReccCard';
import axios from 'axios';
import host from '../HostInfo';
import { useFonts } from 'expo-font';
import GardenCard from '../components/GardenCard';

// import plants from '../../dummyData/plants';

const ReccsScreenTwo = (props) => {
    const [plantrecc, setPlantrecc] = useState([]);
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

          const response = await axios.get(host+`/new_recommendation`,options); 
          console.log("OPPP-------------",response.data.recommendation);
          const df_list = response.data.recommendation;
          Object.keys(df_list).map((key, index)=>{
              console.log("keyyyyy",key,df_list[key]);
          });
          setPlantrecc(df_list);
        }
        catch(e){
          console.log(e);
        }
      }

      useEffect(()=>{
        recc();
      },[])

      const [loaded] = useFonts({
        Cardo :require('../../assets/fonts/Cardo-Regular.ttf'),
        AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
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
                keyExtractor={plant=>plant.pid}
                renderItem={({item})=>{

                    return <View style={{flex: 1}}>
                        <Text style={styles.heading}>{item.plantName}</Text>
                        {/* {console.log(">>>",item.recc)} */}
                        <FlatList
                        horizontal={false}
                        showsVerticalScrollIndicator
                        data={item.recc}
                        keyExtractor={plant2=>plant2.id}
                        renderItem={({item: item2})=>{
                            return <View>
                                <TouchableOpacity onPress={()=>{props.navigation.navigate({routeName:'plantRecc',params:{id:item2.id-1}})}}>
                                <ReccCard plant={item2}/>
                                </TouchableOpacity>
                                </View>
                        }}
                        />
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
    height:957,
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
    height: "78%",
},
heading:{
  fontWeight:"bold",
  fontSize:20,
  fontFamily: "AlatsiRegular",
  // backgroundColor: "pink",
  marginBottom: 8,
  marginTop:7,
}
});

export default ReccsScreenTwo;

