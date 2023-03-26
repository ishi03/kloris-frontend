import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import axios from 'axios';
import host from '../HostInfo';

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
    return <View>
      <Text style={styles.text}>{question.title}</Text>
      <Text>{question.body}</Text>
      <FlatList
            horizontal={false}
            showsVerticalScrollIndicator
            data={question.comments}
            keyExtractor={comment=>comment._id}
            renderItem={({item})=>{
                return <View>
                  {console.log(item)}
                {/* <TouchableOpacity onPress={()=>{ props.navigation.navigate({routeName:'QuestionPage',params:{_id:item._id}}) }}> */}
                  <Text >{item.user}</Text>
                    <Text >{item.comment}</Text>
                    {/* <PostCard question={item}/> */}
                    {/* </TouchableOpacity> */}
                    
                    </View>
            }}
            />
    </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuestionScreen;
