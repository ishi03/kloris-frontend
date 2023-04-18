import React, { useState } from 'react';
import { Image,View, Text, StyleSheet } from 'react-native';
import Checkbox from "expo-checkbox";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import host from '../HostInfo';
import { useFonts } from 'expo-font';


const TaskCard = ({task}) => { // pass status as prop

  const [isChecked, setChecked] = useState(task.status);
  console.log("from db ", task.status);
  const checkTask=async()=>{
    const config = {
      headers:{
        'x-access-token':await AsyncStorage.getItem('token')
      }
    };
  const response  = await axios.post(host+`/done_task/`+task._id,config);
  }

  const uncheckTask=async()=>{
    const config = {
      headers:{
        'x-access-token':await AsyncStorage.getItem('token')
      }
    };
  const response  = await axios.post(host+`/undone_task/`+task._id,config);
  }

  const checkHandler=()=>{
    // setChecked(!isChecked);
    console.log(isChecked);
    if(isChecked===true){
      uncheckTask();
      setChecked(false);
    }
    else{
      checkTask();
      setChecked(true);
    }
  }

  const [loaded] = useFonts({
    AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
    AileronThin :require('../../assets/fonts/Aileron-Thin.otf'),
    OpenSans :require('../../assets/fonts/OpenSans-Regular.ttf')
  });

  if (!loaded) {
    return null;
  };

    return <View style={styles.cardView}>
        <Image style={styles.image} source={{uri: task.image}}/>
        {/* <Text>{task.imgSource}</Text> */}
        <View style={styles.textView}>
        <Text style={styles.nameText}>{task.plant_name}</Text>
        <Text style={styles.taskText}>{task.task}</Text>
        {/* <Text>{task.status}</Text> */}
        <Text style={styles.infoText}>{task.otherInfo}</Text>
        </View>
        <View style={styles.checkboxView}>
        <Checkbox
        style={styles.checkbox}
        color="#388000"
        value={isChecked} // if true or false
        onValueChange={checkHandler}
         />
        </View>
    </View>
};

const styles = StyleSheet.create({
  cardView:{
    flexDirection:"row",
    backgroundColor:"#D6E8C8",
    marginTop:"2%",
    // marginLeft:"5%",
    // marginRight:"5%",
    borderRadius:15,
    padding:"3%",
  },
  textView:{
    marginLeft:"10%",
    // backgroundColor:"pink",
    width:"50%"
  },
  nameText: {
    fontSize: 15,
    fontFamily:"AileronThin"
  },
  taskText: {
    fontSize: 18,
    fontFamily:"AlatsiRegular",
    marginBottom: "8%",
    marginTop:"2%",
    // fontWeight: "bold"
  },
  infoText: {
    fontSize: 10,
    fontFamily:"OpenSans",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80/2,
    overflow: "hidden",
    borderWidth: 3,
  },
  checkboxView:{
    // backgroundColor: "yellow",
    textAlign:"center",
  },
  checkbox:{
    marginTop:"130%",
    // marginLeft:"3%"
  }
});

export default TaskCard;
