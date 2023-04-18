import React, { useReducer } from 'react';
import { Image,View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const GardenCard = ({plant}) => {

  const [loaded] = useFonts({
    AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
    AileronThin :require('../../assets/fonts/Aileron-Thin.otf')
  });

  if (!loaded) {
    return null;
  };

    return <View style={styles.cardView}>
        <Image style={styles.image} source={{uri:plant.image}}/>

        <View style={styles.textView}>
        <Text style={styles.plantText}>{plant.plant_name}</Text>
        <Text style={styles.infoText}>added March 03</Text>

        </View>
        </View>
};

const styles = StyleSheet.create({
    
  cardView:{
    flexDirection:"row",
    backgroundColor:"#D6E8C8",
    marginTop:"8%",
    // marginLeft:"5%",
    // marginRight:"5%",
    borderRadius:15,
    paddingLeft:"5%",
    paddingBottom:"2%",
    paddingTop:"2%"
  },
  textView:{
    marginLeft:"10%"
  },
  nameText: {
    fontSize: 15,
  },
  plantText: {
    fontSize: 20,
    marginBottom: "8%",
    marginTop:"2%",
    // fontWeight: "bold",
    fontFamily: "AlatsiRegular"
  },
  infoText: {
    fontSize: 15,
    marginTop: "5%", 
    fontFamily:"AileronThin"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80/2,
    overflow: "hidden",
    borderWidth: 3,
  },
});

export default GardenCard;
