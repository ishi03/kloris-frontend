import React, { useReducer } from 'react';
import { Image,View, Text, StyleSheet } from 'react-native';

const TaskCard = (props) => {
    return <View style={styles.cardView}>
        <Image style={styles.image} source={props.imgSource}/>
        <View style={styles.textView}>
        <Text style={styles.nameText}>{props.name}</Text>
        <Text style={styles.taskText}>{props.task}</Text>
        <Text style={styles.infoText}>{props.otherInfo}</Text>
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 80/2,
    overflow: "hidden",
    borderWidth: 3,
  },
});

export default TaskCard;
