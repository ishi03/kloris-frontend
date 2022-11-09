import React, { useReducer } from 'react';
import { Text, StyleSheet, View, FlatList,TouchableOpacity } from 'react-native';
import GardenCard from '../components/GardenCard';
import plants from '../../dummyData/plants';

const GardenScreen = (props) => {
    const reducer=()=>{
        
    }
    const [state,dispatch]=useReducer(reducer,{count:0});
    return <View style={styles.viewStyle}>
            <Text style={styles.greetingText}>My Garden</Text>
         <View>
                <View style={styles.plantView}>
                <FlatList
                horizontal={false}
                showsVerticalScrollIndicator
                data={plants}
                keyExtractor={plant=>plant.id}
                renderItem={({item})=>{
                    return <View>
                       <TouchableOpacity onPress={()=>{props.navigation.navigate('Plantprofile')}}>
                        {/* <Text style={styles.headingText}>My Garden</Text> */}
                        <GardenCard plant={item}/>
                       {/* { console.log(item)} */}
                        </TouchableOpacity>
                        
                        </View>
                }}
                />
                </View>
        </View>

    </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  viewStyle:{
    marginLeft:"5%",
    marginRight:"5%",
    marginTop:"5%",
    height:"100%"
    // marginBottom:"5%",
  },
  greetingText:{
    fontSize:28,
    fontWeight: "bold"
},
plantView:{
    flexDirection:"column",
    height: "80%",
}
});

export default GardenScreen;
