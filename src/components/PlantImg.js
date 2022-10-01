import React, { useReducer } from 'react';
import { Image,View, Text, StyleSheet } from 'react-native';

const PlantImg = (props) => {
    return <View>
        <Image style={styles.image} source={props.imgSource}/>
    </View>
};

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 80/2,
    overflow: "hidden",
    borderWidth: 3,
    margin:"2%",
  },

});

export default PlantImg;
