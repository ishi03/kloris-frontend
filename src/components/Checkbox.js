import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StyleSheet } from 'react-native'
import { TouchableOpacity, Text } from 'react-native'

const CheckBox = ({ selected, onPress, disabled, style, textStyle, size = 30, text = '', ...props}) => (
    <TouchableOpacity style={[styles.checkBox, style]} onPress={onPress} disabled={disabled} {...props}>
        <Icon
            size={size}
            color='#211f30'
            name={ selected ? 'check-box' : 'check-box-outline-blank'}
        />

        <Text style={textStyle}> {text} </Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default CheckBox;