import React, { useReducer } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import InfoCard from '../components/InfoCard';
import { useFonts } from 'expo-font';

const plant={
    "id":4,
    "name":"Aloe Vera",
    "imgSource":require("../../assets/aloevera.jpg"),
    "task":"Watering Time"
}
const PlantScreen = () => {
    // const reducer=()=>{
        
    // }
    // const [state,dispatch]=useReducer(reducer,{count:0});
  
    const [loaded] = useFonts({
      AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
    });
  
    if (!loaded) {
      return null;
    };

    return <View style={styles.viewStyle}>
      {console.log(plant)}
      <View style={styles.upperView}>
        <Text style={styles.nameText}>{plant.name}</Text>
        <Image source={plant.imgSource} style={styles.image}/>
      </View>

      <View>
        <Text style={styles.headingText}>Care Tips</Text>
        <InfoCard/>
      </View>

  </View>
};

const styles = StyleSheet.create({

  nameText:{
    fontSize:30,
    // fontWeight: "bold",
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
