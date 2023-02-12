import React, { useReducer } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import PostCard from '../components/PostCard';
import posts from '../../dummyData/posts';

const ForumScreen = (props) => {
    const reducer=()=>{
        
    }
    const [state,dispatch]=useReducer(reducer,{count:0});
    return <View>
        <Text style={styles.text}>Discussion Board</Text>
        <FlatList
            horizontal={false}
            showsVerticalScrollIndicator
            data={posts}
            keyExtractor={post=>post.id}
            renderItem={({item})=>{
                return <View>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('postpage')}}>
                    {/* <Text >{item.title}</Text> */}
                    <PostCard post={item}/>
                    </TouchableOpacity>
                    
                    </View>
            }}
            />
    </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default ForumScreen;
