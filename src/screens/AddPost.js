import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ImageBackground,
    Button,
    TouchableOpacity,
  } from "react-native";

const AddPost = () =>{
    const [title, setTitle] = useState("");
    
    return(
        <View>
            <View style={styles.title1}>
                <View>
                    <Text style={styles.heading}>Create Post</Text>
                </View>
            <TouchableOpacity style={styles.postbtn}>
                <Text>Post</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.inputView}>
            <TextInput
            style={styles.title}
            placeholder="Title"
            placeholderTextColor="#003f5c"
            onChangeText={(title) => setTitle(title)}
            />
        </View>

        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Body"
            placeholderTextColor="#003f5c"
            onChangeText={(title) => setTitle(title)}
            />
        </View>

        </View>
    )
}

const styles = StyleSheet.create({
    postbtn:{
      width: "20%",
      borderRadius: 25,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      backgroundColor: "#388000",
    },
    title: {
          width: "70%",
          height: 45,
          marginBottom: 20,
          marginLeft: "5%",
          alignItems: "flex-start",
          fontSize: 30
        },
    title1:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    inputView: {
          borderWidth:1,
        //   borderRadius: 30,
          width: "70%",
          height: 45,
          marginBottom: "3%",
          alignItems: "flex-start",
        },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: "5%",
        },
    heading: {
        fontSize: 30,
        marginBottom: "5%",
        },
})

export default AddPost;