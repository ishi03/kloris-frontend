import React from 'react';
import { Text, StyleSheet,View, TouchableOpacity } from 'react-native';

const HomeScreen = (props) => {
  return <View>
    <Text style={styles.text}>Home Screen</Text>
    {/* <TouchableOpacity onPress={()=>{props.navigation.navigate('Counter')}}>
      <Text>Go to Counter</Text>
    </TouchableOpacity> */}

    <TouchableOpacity onPress={()=>{props.navigation.navigate('Task')}}>
      <Text>Go to Tasks</Text>
    </TouchableOpacity>

    {/* <TouchableOpacity onPress={()=>{props.navigation.navigate('Plantprofile')}}>
      <Text>Go to Plants</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>{props.navigation.navigate('garden')}}>
      <Text>Go to Garden</Text>
    </TouchableOpacity> */}

    <TouchableOpacity onPress={()=>{props.navigation.navigate('login')}}>
      <Text>Login</Text>
    </TouchableOpacity>

  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
