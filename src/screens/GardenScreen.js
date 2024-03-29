import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList,TouchableOpacity, Button } from 'react-native';
import GardenCard from '../components/GardenCard';
import plants from '../../dummyData/plants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import host from '../HostInfo';
import { useFonts } from 'expo-font';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddPlant from './AddPlant';

const GardenScreen = (props) => {

  const [plants1,setPlants1]=useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getPlants= async()=>{
    const t= await AsyncStorage.getItem('token')
    const AuthStr='Bearer '.concat(t)
      const config = {
        headers: {
          'x-access-token':await AsyncStorage.getItem('token'),
          'Authorization': AuthStr
      }
      };
    const response  = await axios.get(host+`/mygarden`,config);
    setPlants1(response.data.plants);
    console.log("----")
    console.log(plants1);
}
  useEffect(() => {
    getPlants();
  }, []);

  const [loaded] = useFonts({
    AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
    AileronThin :require('../../assets/fonts/Aileron-Thin.otf'),
    Cardo :require('../../assets/fonts/Cardo-Regular.ttf')
  });

  if (!loaded) {
    return null;
  };

    return <View style={styles.viewStyle}>

            <View style={styles.title}>
              <Text style={styles.greetingText}>My Garden</Text>
              <TouchableOpacity onPress={()=>{toggleModal()}}>
                <Icon name="add-circle-outline" size={32} style={styles.image}/>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
      {/* <Button title="Show modal" onPress={toggleModal} /> */}

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <AddPlant toggleModal={toggleModal}/>
          {/* <Button title="Hide modal" onPress={toggleModal} /> */}
        </View>
      </Modal>
    </View>
         <View>
                <View style={styles.plantView}>
                <FlatList
                horizontal={false}
                showsVerticalScrollIndicator
                data={plants1}
                keyExtractor={plant=>plant._id}
                renderItem={({item})=>{
                    return <View>
                       <TouchableOpacity onPress={()=>{props.navigation.navigate({routeName:'Plantprofile',params:{_id:item._id}})}}>
                        <GardenCard plant={item}/>
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
    // fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Cardo",
    color: "white",
    width: "70%",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    marginTop: 5,
    paddingLeft:15,
    backgroundColor: "#388000",
},
plantView:{
    flexDirection:"column",
    height: "90%",
    // backgroundColor:"green"
},
title:{
  flexDirection:"row",
  justifyContent: "space-between",
  // marginLeft:20
},
image: {
  // width:30,
  // height:30,
  marginRight:"2%",
  marginLeft:"5%",
  marginTop:"35%",
  color:"green"
  // borderRadius:150,
},
});

export default GardenScreen;
