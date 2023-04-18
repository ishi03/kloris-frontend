import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';

  const data = [
    { label: 'Medicinal Herb', value: 'Medicinal Herb' },
    { label: 'Vegetable', value: 'Vegetable' },
    { label: 'Cut Flower', value: 'Cut Flower' },
    { label: 'Any', value: '' },

  ];

  const DropdownComponent = (props) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    // const renderLabel = () => {
    //   if (value || isFocus) {
    //     return (
    //       <Text style={[styles.label, isFocus && { color:"#388000" }]}>
    //         select use
    //       </Text>
    //     );
    //   }
    //   return null;
    // };
    const [loaded] = useFonts({
      AlatsiRegular: require('../../assets/fonts/Alatsi-Regular.ttf'),
      PoppinsMedium :require('../../assets/fonts/Poppins-ExtraLight.ttf')

    });
  
    if (!loaded) {
      return null;
    };

    return (
      <View style={styles.container}>
        {/* {renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "#388000" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Use' : '...'}
          searchPlaceholder="Search.."
          placeholderTextColor="#003f5c"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value)
            props.addUse(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
      width: "80%"
    },
    dropdown: {
      height: 50,
      // borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 30,
      paddingHorizontal: "12%",
      alignItems: "flex-start",
      height: 45,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      fontFamily:"PoppinsMedium"
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      fontFamily:"PoppinsMedium"
    },
  });