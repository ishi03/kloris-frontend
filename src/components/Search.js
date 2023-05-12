import { SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { View,Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

export default function Search() {
    const [selectedItem, setSelectedItem] = useState(null);

    return <View>
        <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={{ id: '2' }}
        onSelectItem={setSelectedItem}
        dataSet={[
            { id: '1', title: 'Alpha' },
            { id: '2', title: 'Beta' },
            { id: '3', title: 'Gamma' },
        ]}
        />;
    </View>
}

const styles = StyleSheet.create({
    flatList:{
        paddingLeft: 15, 
        marginTop:15, 
        paddingBottom:15,
        fontSize: 20,
        borderBottomColor: '#26a69a',
        borderBottomWidth:1
    }
  });