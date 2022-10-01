import React, { useReducer } from 'react';
import { View,Text, StyleSheet } from 'react-native';
import TaskCard from '../components/TaskCard';
import PlantImg from '../components/PlantImg';

const TaskScreen = () => {
    return <View style={styles.viewStyle}>
        <Text style={styles.greetingText}>Good Morning!</Text>
        <View>
            <Text style={styles.headingText}>My Garden</Text>
            <View style={styles.gardenView}>
                <PlantImg 
                imgSource={require("../../assets/aloevera.jpg")}
                />
                <PlantImg 
                imgSource={require("../../assets/tulsi.jpg")}
                />
                <PlantImg 
                imgSource={require("../../assets/succulent.png")}
                />
            </View>
        </View>

        <View>
            <Text style={styles.headingText}>Tasks</Text>
                <TaskCard 
                name="Aloe Vera"
                imgSource={require("../../assets/aloevera.jpg")}
                task="Watering Time" 
                otherInfo="20-30ml"/>

                <TaskCard 
                name="Succulent"
                imgSource={require("../../assets/succulent.png")}
                task="Watering Time" 
                otherInfo="50-60ml"/>
        </View>

    </View>
};

const styles = StyleSheet.create({
    viewStyle:{
        marginLeft:"5%",
        marginRight:"5%",
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
    }
});

export default TaskScreen;
