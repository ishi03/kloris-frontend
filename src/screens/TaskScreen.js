import React, { useReducer } from 'react';
import { View,Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import TaskCard from '../components/TaskCard';
import PlantImg from '../components/PlantImg';
import plants from '../../dummyData/plants';
import tasks from '../../dummyData/tasks';

const TaskScreen = (props) => {
    return <View style={styles.viewStyle}>
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
                data={tasks}
                keyExtractor={task=>task.id}
                renderItem={({item})=>{
                    return <View>
                        <TaskCard task={item}/>
                        </View>
                }}
                />
                </View>
        </View>

    </View>
};

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
