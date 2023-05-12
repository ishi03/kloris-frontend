import React, { useReducer, useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import PostCard from '../components/PostCard';
import posts from '../../dummyData/posts';
import { Button } from 'react-native';
import axios from 'axios';
import host from '../HostInfo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';

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

    const [loaded] = useFonts({
      AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
      AileronThin :require('../../assets/fonts/Aileron-Thin.otf')
    });

    if (!loaded) {
      return null;
    };

    return <View>
        <View style={styles.title}>
        <Text style={styles.headingText}>Discussion Board</Text>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('AddPost')}}>
          <Icon name="pen" size={21} style={styles.image}/>
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
    marginLeft:20
  },
  text: {
    fontSize: 30,
    fontFamily:"AlatsiRegular"
  },
  image: {
    width:30,
    height:30,
    marginRight:"2%",
    marginLeft:"5%",
    marginTop:"35%",
    color:"green"
    // borderRadius:150,
  },
  headingText:{
    fontSize:22,
    // fontWeight: "bold",
    fontFamily: "Cardo",
    // alignSelf: 'flex-start',
    color: "white",
    width: "60%",
    borderRadius: 15,
    height: 35,
    justifyContent: "center",
    marginTop: 13,
    paddingLeft:15,
    backgroundColor: "#388000",
},
});

export default ForumScreen;
