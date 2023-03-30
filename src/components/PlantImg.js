import React, { useReducer } from 'react';
import { Image,View, Text, StyleSheet } from 'react-native';

const PlantImg = ({plant}) => {
    return <View>
        <Image 
                source={{uri:plant.image}}
                style={styles.image}
            />
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
  }
});

export default PlantImg;
