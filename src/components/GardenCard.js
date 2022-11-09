import React, { useReducer } from 'react';
import { Image,View, Text, StyleSheet } from 'react-native';

const GardenCard = ({plant}) => {
    return <View style={styles.cardView}>
        <Image style={styles.image} source={plant.imgSource}/>

        <View style={styles.textView}>
        <Text style={styles.plantText}>{plant.name}</Text>
        <Text style={styles.infoText}>{plant.otherInfo}</Text>

        </View>
        </View>
};

const styles = StyleSheet.create({
    
  cardView:{
    flexDirection:"row",
    // backgroundColor:"#D6E8C8",
    marginTop:"8%",
    // marginLeft:"5%",
    // marginRight:"5%",
    borderRadius:15,
    paddingLeft:"5%",
    paddingBottom:"2%",
  },
  textView:{
    marginLeft:"10%"
  },
  nameText: {
    fontSize: 15,
  },
  plantText: {
    fontSize: 18,
    marginBottom: "8%",
    marginTop:"2%",
    fontWeight: "bold"
  },
  infoText: {
    fontSize: 15,
    marginTop: "5%"
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
