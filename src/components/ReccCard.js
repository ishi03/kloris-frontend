import React, { useReducer } from 'react';
import { Image,View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const ReccCard = ({plant}) => {
  const [loaded] = useFonts({
    AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
    AileronThin :require('../../assets/fonts/Aileron-Thin.otf')
  });

  if (!loaded) {
    return null;
  };
    return <View style={styles.cardView}>
        <Image style={styles.image} source={{uri: plant.image }}/>
        {/* <Text>{plant.image}</Text> */}
        <View style={styles.textView}>
        <Text style={styles.plantText}>{plant.common_name}</Text>
        <Text style={styles.infoText}>{plant.scientific_name}</Text>

        </View>
        </View>
};

const styles = StyleSheet.create({
    
  cardView:{
    flexDirection:"row",
    backgroundColor:"#D6E8C8",
    borderColor:"black",
    border:"1px",
    marginTop:"5%",
    // marginLeft:"1%",
    marginRight:"3%",
    borderRadius:15,
    padding:"2%",
  },
  textView:{
    marginLeft:"10%",
    marginRight:"20%",
  },
  nameText: {
    fontSize: 15,
  },
  plantText: {
    fontSize: 18,
    marginBottom: "8%",
    marginTop:"2%",
    // fontWeight: "bold"
    fontFamily: "AlatsiRegular",
  },
  infoText: {
    fontSize: 15,
    marginTop: "1%",
    fontFamily: "AileronThin",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80/2,
    overflow: "hidden",
    borderWidth: 3,
  },
});

export default ReccCard;
