import React, { useReducer, useEffect, useState } from 'react';
import { View,Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import TaskCard from '../components/TaskCard';
import PlantImg from '../components/PlantImg';
import plants from '../../dummyData/plants';
import tasks from '../../dummyData/tasks';
import axios from "axios";
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import host from '../HostInfo';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import Midnight from 'react-native-midnight'
// create add custom task space; add date and username
const TaskScreen = (props) => {
    const [tasks1,setTasks1]=useState([]);
    const [plants1,setPlants1]=useState([]);
    // const [name, setName]=useState("");

    const getTasks1= async()=>{
        const config = {
            headers:{
              'x-access-token':await AsyncStorage.getItem('token')
            }
          };
        const response  = await axios.get(host+`/user_todos`,config);
        setTasks1(response.data.tasks);
        console.log("----")
        console.log(tasks1);
        // setName(tasks1[0].username);
    }

    const getPlants= async()=>{
        const t= await AsyncStorage.getItem('token')
        const AuthStr='Bearer '.concat(t)
          const config = {
            headers: {
              'x-access-token':await AsyncStorage.getItem('token'),
              'Authorization': AuthStr
          }
          };
        const response  = await axios.get(host+`/mygarden`,config);
        setPlants1(response.data.plants);
        console.log("----")
        console.log(plants1);
    }

    const updateTask=async()=>{
        const config = {
          headers:{
            'x-access-token':await AsyncStorage.getItem('token')
          }
        };
      const response  = await axios.post(host+`/update_todos`,config);
      console.log(response.data)
      }

    //   const midnight=() => {
    //     const listener = Midnight.addListener(() => {
    //       updateTask();
    //     })
    //     return () => listener.remove()
    //   }

    useEffect(() => {
        getTasks1();
        getPlants();
        // updateTask();
      }, []);

      const [loaded] = useFonts({
        AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
        Cardo :require('../../assets/fonts/Cardo-Regular.ttf')
      });
    
      if (!loaded) {
        return null;
      };

    return (
        <View style={styles.viewStyle}>
        <Text style={styles.greetingText}>Welcome back!</Text>
        <View>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('garden')}}>
        <Text style={styles.headingText}>My Garden</Text>
        </TouchableOpacity>
            
            <View style={styles.gardenView}>
            <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data={plants1}
                keyExtractor={plant=>plant._id}
                renderItem={({item})=>{
                    return <View>
                        <PlantImg plant={item}/>
                        </View>
                }}
            />
             </View>
        </View>


        <View>
            <Text style={styles.headingText}>Tasks</Text>
                <View style={styles.taskView}>
                <FlatList
                horizontal={false}
                showsVerticalScrollIndicator
                data={tasks1}
                keyExtractor={task=>task._id}
                renderItem={({item})=>{
                    return <View>
                        <TaskCard task={item}/>
                        </View>
                }}
                />
                </View>
        </View>

    </View>)
};

const styles = StyleSheet.create({
    viewStyle:{
        marginLeft:"5%",
        marginRight:"5%",
        height:"100%",
        // backgroundColor: 'white'
        // marginBottom:"5%",
      },
    greetingText:{
        fontSize:28,
        // fontWeight: "bold",
        marginBottom: 10,
        fontFamily: "AlatsiRegular"
    },
    headingText:{
        fontSize:20,
        // fontWeight: "bold",
        fontFamily: "Cardo",
        // alignSelf: 'flex-start',
        color: "white",
        width: "50%",
        borderRadius: 15,
        height: 35,
        justifyContent: "center",
        marginTop: 10,
        paddingLeft:15,
        backgroundColor: "#388000",
    },
    gardenView:{
        flexDirection:"row",
        marginBottom: 18
    },
    taskView:{
        flexDirection:"column",
        height: "80%",
    }
});

export default TaskScreen;
