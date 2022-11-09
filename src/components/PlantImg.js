import React, { useReducer } from 'react';
import { Image,View, Text, StyleSheet } from 'react-native';

const PlantImg = ({plant}) => {
    return <View>
        {/* <Image style={styles.image} source={plant.imgSource}/> */}
        <Image 
                source={plant.imgSource}
                style={styles.image}
            />
        <Text>{plant.name}</Text>
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
}
// ,
//   image2:{
//     width: 80,
//     height: 80,
//     borderRadius: 80/2,
//     overflow: "hidden",
//     borderWidth: 3,
//     margin:"2%",
//   },

});

export default PlantImg;
