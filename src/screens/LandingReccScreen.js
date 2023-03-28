import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import host from '../HostInfo';

const LandingReccScreen = ({navigation}) => {

    return <View>
        <TouchableOpacity>
            <Text>Get Fresh Reccomendations</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    btn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#388000",
      },
})

export default LandingReccScreen;