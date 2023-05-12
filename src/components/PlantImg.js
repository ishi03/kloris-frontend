import React, { useReducer } from 'react';
import { Image,View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';


const PlantImg = ({plant}) => {

const plantplaceholder=require("../../assets/plantplaceholder.png")
  
  const [loaded] = useFonts({
    AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
    AileronThin :require('../../assets/fonts/Aileron-Thin.otf')
  });
  
  if (!loaded) {
    return null;
  };
    return <View>
        {plant.image?<Image source={{uri:plant.image}}  style={styles.image}/>:<Image source={plantplaceholder}  style={styles.image} />}
        <Text style={styles.name}>{plant.plant_name}</Text>
    </View>
};

const styles = StyleSheet.create({
  image: {
    width:80,
    height:80,
    borderRadius:40,
    // overflow:"hidden",
    borderWidth:2,
    margin:8
},
  name:{
    textAlign:"center",
    fontFamily:"AlatsiRegular"
  }
});

export default PlantImg;
