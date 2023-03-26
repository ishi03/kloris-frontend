import React, { useReducer, useEffect, useState } from 'react';
import { View,Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import TaskCard from '../components/TaskCard';
import PlantImg from '../components/PlantImg';
import plants from '../../dummyData/plants';
import tasks from '../../dummyData/tasks';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import host from '../HostInfo';
import Icon from 'react-native-vector-icons/FontAwesome5';

// create add custom task space; add date and username
const TaskScreen = (props) => {
    const [tasks1,setTasks1]=useState([]);
    const [plants1,setPlants1]=useState([]);

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
    }

    const getPlants1= async()=>{
        const config = {
            headers:{
              'x-access-token':await AsyncStorage.getItem('token')
            }
          };
        const response  = await axios.get(host+`/all_todos`,config);
        setTasks1(response.data.tasks);
        console.log("----")
        console.log(tasks1);
    }

    useEffect(() => {
        getTasks1();
      }, []);

    return (
        <View style={styles.viewStyle}>
        <Text style={styles.greetingText}>Good Morning!</Text>
        <View>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('garden')}}>
        <Text style={styles.headingText}>My Garden</Text>
        </TouchableOpacity>
            
            <View style={styles.gardenView}>
            <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data={plants}
                keyExtractor={plant=>plant.id}
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
// const myIcon2 = <Icon name="rocket" size={30} color="#900" />;
// TaskScreen.navigationOptions = () => {
//     return {
//         title: 'Home!',
//         tabBarIcon: ()=>{
//             return <Icon name="rocket" size={30} color="#900" />
//     },
//         tabBarLabel:'tasks',
//     };
//   };


// title: 'Home',
// tabBarIcon: <Icon name="rocket" size={30} color="#900" />

const styles = StyleSheet.create({
    viewStyle:{
        marginLeft:"5%",
        marginRight:"5%",
        height:"100%"
        // marginBottom:"5%",
      },
    greetingText:{
        fontSize:28,
        fontWeight: "bold"
    },
    headingText:{
        fontSize:18,
        fontWeight: "bold"
    },
    gardenView:{
        flexDirection:"row",
    },
    taskView:{
        flexDirection:"column",
        height: "80%",
    }
});

export default TaskScreen;
