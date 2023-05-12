import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect } from 'react';
import { View,Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from "axios";
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import host from '../HostInfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TaskCard from './TaskCard';
import Calendar from './Calendar';
import moment from 'moment';

// have to add all this code to taskScreen for rendering tasks
// alternatively, try to make new component to display tasks

export default function DatePicker() {

  const today= moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(moment(today).format('MMMM'));
  const [tasks1,setTasks1]=useState([]);
  const initialRender = useRef(true);

  const afterSelectDate=()=>{
    console.log(selectedDate, currentMonth); //    RECTIFYYYYYY
  }
  
  const onSelectDate=(d)=>{
    setSelectedDate(d);
    setCurrentMonth(moment(d).format('MMMM'));
  }

  const getTasks1= async()=>{
        
        if(selectedDate==today){
          console.log("today is selected!")
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
        else{
          console.log("not today")
          const t= await AsyncStorage.getItem('token')
          const AuthStr='Bearer '.concat(t)
          const options = {
            headers: {
              'x-access-token':await AsyncStorage.getItem('token'),
              'Content-Type': 'multipart/form-data',
              'Authorization': AuthStr
          }
          };
          var bodyFormData = new FormData();
          bodyFormData.append('ipdate', selectedDate); 
          const response = await axios.post(host+`/get_tasksByDate`,bodyFormData,options); 
          console.log(response.data.tasks);
          console.log(response.data.tasks.length);
          if(response.data.tasks.length==0){
            console.log("no tasks");
            setTasks1([]);
          }
          else{
            setTasks1(response.data.tasks);
          }
          // const response  = await axios.get(host+`/user_todos`,config);
          // setTasks1(response.data.tasks);
          // console.log("----")
          // console.log(tasks1);
        }
        // setName(tasks1[0].username);
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


  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      afterSelectDate();
    }
    getTasks1();
  }, [selectedDate]);

  // useEffect(() => {
  //   getTasks1();
  //   // updateTask();
  // }, []);

  const [loaded] = useFonts({
    AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
    Cardo :require('../../assets/fonts/Cardo-Regular.ttf')
  });

  if (!loaded) {
    return null;
  };

  return (
    <View>
  <Text style={styles.headingText}>Tasks</Text>
      <View style={styles.container}>
      <Text style={styles.month}>{currentMonth} 2023</Text>
      <Calendar onSelectDate={onSelectDate} selected={selectedDate} />
      <StatusBar style="auto" />
    </View>
    
  <View>
      {tasks1.length==0?<View style={styles.notask}>
        <Icon name="clipboard-check-outline" size={150} style={styles.icon}/>
        <Text style={styles.tinytext}>No Tasks for this day</Text>
      </View>:
      <View style={{height:0.5}}/>}
      <View style={styles.taskView}>
      <FlatList
      horizontal={false}
      showsVerticalScrollIndicator
      data={tasks1}
      keyExtractor={task=>task._id}
      renderItem={({item})=>{
          return <View>
              <TaskCard task={item} disabled={selectedDate==today?false:true}/>
              </View>
      }}
      />
      </View>
  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'pink',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 5
  },
  month: {
    // backgroundColor:'yellow',
    marginTop:7,
    marginBottom:1,
    marginLeft: "3%",
    fontSize: 15,
    fontFamily: "AlatsiRegular"
  },
  viewStyle:{
    marginLeft:"5%",
    marginRight:"5%",
    height:"100%",
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
    height: "69.5%",
},
notask:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:"5%"
},
tinytext:{
  fontSize:18,
  fontFamily:"AlatsiRegular",
  color:"#D6E8C8",
  marginLeft:"2%"
},
icon:{
  color:"#D6E8C8",
}
});