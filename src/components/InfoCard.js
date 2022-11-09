import React, { useReducer } from 'react';
import { Image,View, Text, StyleSheet } from 'react-native';

const InfoCard = () => {
    return <View style={styles.cardView}>
        <View style={styles.textView}>
        <Text style={styles.nameText}>tips</Text>
        </View>
    </View>
};

const styles = StyleSheet.create({
  cardView:{
    flexDirection:"row",
    backgroundColor:"#D6E8C8",
    marginTop:"5%",
    // marginLeft:"5%",
    // marginRight:"5%",
    borderRadius:15,
    padding:"5%",
  },
  textView:{
    marginLeft:"10%"
  },
  nameText: {
    fontSize: 15,
  },
  taskText: {
    fontSize: 18,
    marginBottom: "8%",
    marginTop:"2%",
    fontWeight: "bold"
  },
  infoText: {
    fontSize: 10,
  },
});

export default InfoCard;
