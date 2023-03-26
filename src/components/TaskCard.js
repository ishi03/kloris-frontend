import React, { useReducer } from 'react';
import { Image,View, Text, StyleSheet } from 'react-native';
// import { CheckBox } from '@rneui/themed';

const TaskCard = ({task}) => { // pass status as prop
    return <View style={styles.cardView}>
        <Image style={styles.image} source={task.imgSource}/>
        <View style={styles.textView}>
        <Text style={styles.nameText}>{task.name}</Text>
        <Text style={styles.taskText}>{task.task}</Text>
        <Text style={styles.infoText}>{task.otherInfo}</Text>
        </View>
        <View>
        {/* <CheckBox
           checked={true}
           onPress={toggleCheckbox}
           iconType="material-community"
           checkedIcon="checkbox-outline"
           uncheckedIcon={'checkbox-blank-outline'}
           checkedColor="#388000"
         /> */}
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
