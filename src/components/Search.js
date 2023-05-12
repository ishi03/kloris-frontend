import React, { memo, useCallback, useRef, useState, useEffect } from 'react'
import { Button, Dimensions, Text, View, Platform } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import host from '../HostInfo';
import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()

const Search = ({navigation}) => {
  const [loading, setLoading] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const dropdownController = useRef(null)

  const searchRef = useRef(null);
//   const initialRender = useRef(true);

  const onselect = (id) =>{
    navigation.navigate({routeName:'searchPlant',params:{id:id-1}});
  }
  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase()
    console.log('getSuggestions', q)
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null)
      return
    }
    setLoading(true)
    const response = await fetch(host+`/getallplants`)
    const items = await response.json()
    // console.log(items)
    const suggestions = items.plants
      .filter(item => item.label.toLowerCase().includes(filterToken))
      .map(item => ({
        id: item.id,
        label: item.label,
      }))
    setSuggestionsList(suggestions)
    setLoading(false)
  }, [])

  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
  }, [])

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('didFocus', () => {
//       setSelectedItem(null)
//     });  
//     return ()=>{unsubscribe};
  
//   }, [navigation]);

  const onOpenSuggestionsList = useCallback(isOpened => {}, [])

  return (
    <View>
      <View
        style={[
          { flex: 1, flexDirection: 'row', alignItems: 'center' },
        ]}>
        <AutocompleteDropdown
          ref={searchRef}
          controller={controller => {
            dropdownController.current = controller
          }}
          // initialValue={'1'}
          direction={Platform.select({ android: 'down' })}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={item => {
            item && setSelectedItem(item.id)
            item && onselect(item.id);
          }}
          debounce={600}
          suggestionsListMaxHeight={100}
          onClear={onClearPress}
          //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false} // set false to prevent rerender twice
          textInputProps={{
            placeholder: 'Search for a plant ...',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 25,
              backgroundColor: 'white',
              color: 'black',
              paddingLeft: 18,
              borderWidth:1,
              borderColor: "#D3DBDF",
              marginTop: 10,
              marginBottom: 10,
              height: 40,
            },
          }}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,

            alignSelf: 'center',
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderRadius: 25,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: 'white',
            // color:'black'
          }}
          containerStyle={{ width: 300 }}
          renderItem={(item, text) => <Text style={{ color: 'black', padding: 15 }}>{item.label}</Text>}
          ChevronIconComponent={<Feather name="chevron-down" size={20} color="black" />}
          ClearIconComponent={<Feather name="x-circle" size={18} color="#black" />}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
          //  showClear={false}
        />
        <View style={{ width: 10, marginTop:30 }} />
        {/* <Button style={{ width: 20, height:20, marginTop:70 }} title="Toggle" onPress={() => dropdownController.current.toggle()} /> */}
      </View>
      <Text style={{ color: '#668', fontSize: 1, marginTop: 50 }}> </Text>
    </View>
  )
}
 
 export default Search;