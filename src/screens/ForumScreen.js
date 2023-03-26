import React, { useReducer, useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import PostCard from '../components/PostCard';
import posts from '../../dummyData/posts';
import { Button } from 'react-native';
import axios from 'axios';
import host from '../HostInfo';
const ForumScreen = (props) => {

    const [questions, setQuestions]=useState([]);
    const getQuestions=async()=>{
      const response=await axios.get(host+`/all_discussions`)
      setQuestions(response.data.questions)
      console.log("----Q----");
      console.log(questions);
    }

    useEffect(() => {
      getQuestions();
    }, []);

    return <View>
        <View style={styles.title}>
        <Text style={styles.text}>Discussion Board</Text>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('AddPost')}}>
          <Image source={require("../../assets/add.png")} style={styles.image}/>
          {/* <Text>ADD</Text> */}
        </TouchableOpacity>
        </View>
        <FlatList
            horizontal={false}
            showsVerticalScrollIndicator
            data={questions}
            keyExtractor={question=>question._id}
            renderItem={({item})=>{
                return <View>
                <TouchableOpacity onPress={()=>{ props.navigation.navigate({routeName:'QuestionPage',params:{_id:item._id}}) }}>
                    {/* <Text >{item.title}</Text> */}
                    <PostCard question={item}/>
                    </TouchableOpacity>
                    
                    </View>
            }}
            />
    </View>
};

const styles = StyleSheet.create({
  title:{
    flexDirection:"row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 30,
  },
  image: {
    width:30,
    height:30,
    marginRight:"1%",
    marginLeft:"5%",
    marginTop:"15%"
    // borderRadius:150,
  },
});

export default ForumScreen;
