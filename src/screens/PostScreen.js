import React, { useReducer } from 'react';
import { Text, StyleSheet } from 'react-native';

const PostScreen = () => {
    const reducer=()=>{
        
    }
    const [state,dispatch]=useReducer(reducer,{count:0});
    return <Text style={styles.text}>Hello i am a Post</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default PostScreen;
