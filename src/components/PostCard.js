import React, { useReducer } from 'react';
import { Image,View, Text, StyleSheet } from 'react-native';


const PostCard = ({post}) => {
    return <View style={styles.cardView}>
        <Text style={styles.postText}>{post.title}</Text>
        <View style={styles.likeView}>
            <Image source={require("../../assets/heart.png")} style={styles.image}/>
            <Text>{post.likes}</Text>
            <Image source={require("../../assets/comment.png")} style={styles.image}/>
            <Text>{post.comments}</Text>
        </View>
        </View>
};

const styles = StyleSheet.create({
    
  cardView:{
    // flexDirection:"row",
    backgroundColor:"#FFFFFF",
    borderColor:"black",
    border:"1px",
    marginTop:"5%",
    marginLeft:"1%",
    // marginRight:"5%",
    borderRadius:15,
    paddingLeft:"2%",
    paddingBottom:"2%",
  },
  likeView:{
    flexDirection:"row",
  },
  postText: {
    fontSize: 18,
    marginBottom: "8%",
    marginTop:"2%",
    fontWeight: "bold"
  },
  infoText: {
    fontSize: 15,
    marginTop: "5%"
  },
  image: {
    width:20,
    height:20,
    marginRight:"1%",
    marginLeft:"1%"
    // borderRadius:150,
  }

});

export default PostCard;
