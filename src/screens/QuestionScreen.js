import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import axios from 'axios';
import host from '../HostInfo';
import Icon from 'react-native-vector-icons/Octicons';
import { useFonts } from 'expo-font';


const QuestionScreen = ({ route, navigation }) => {

  const [question, setQuestion]=useState([]);
    const getQuestion=async()=>{
      const response=await axios.get(host+`/discussions/`+navigation.getParam('_id'))
      setQuestion(response.data.question)
      console.log(question.body);
      console.log("----Q'----"+question.title);
    }

    useEffect(() => {
      getQuestion();
    }, []);

  console.log("id"+navigation.getParam('_id'));

  const [loaded] = useFonts({
    OpenSans :require('../../assets/fonts/OpenSans-Regular.ttf')
  });

  if (!loaded) {
    return null;
  };

    return <View style={styles.viewStyle}>
      <Text style={styles.qtext}>{question.title}</Text>
      <Text style={styles.body}>{question.body}</Text>
      <Text style={styles.commentHeading}>Comments</Text>
      <FlatList
            horizontal={false}
            showsVerticalScrollIndicator
            data={question.comments}
            keyExtractor={comment=>comment.cid}
            renderItem={({item})=>{
                return <View style={styles.comment}>
                  {/* {console.log(item)} */}
                  <Text style={styles.user}>{item.user}</Text>
                  <Text style={{fontSize:15,marginLeft:"2%",fontFamily:"OpenSans"}}>{item.comment}</Text>
                    </View>
            }}
            />
    </View>
};

const styles = StyleSheet.create({
  viewStyle:{
    marginLeft:"5%",
    marginRight:"5%",
    height:"100%"
    // marginBottom:"5%",
  },
  qtext: {
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily:"OpenSans",
    marginLeft:"2%",
    marginTop:"5%"
  },
  body:{
    marginLeft:"2%",
    marginTop:"5%",
    fontSize: 15,
    fontFamily:"OpenSans",
  },
  commentHeading:{
    marginTop:"5%",
    // fontWeight: "bold",
    marginLeft:"2%",
    fontFamily:"OpenSans",
  },
  comment:{
    // backgroundColor: "#fff111",
    borderTopColor: '#388000',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: "2.5%",
    marginBottom:"2%",
    // borderBottomColor: 'black',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
   user:{
    fontWeight:"bold",
    marginTop:"2%",
    color:"#636363",
    marginLeft:"2%",
  }
});

export default QuestionScreen;
