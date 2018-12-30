import React, { Component } from 'react';
import {TextInput , View, StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'
export default class Signup extends Component
{
    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.black
        },
        headerTintColor: Colors.themeLight      
    }
    render()
    {
        return (<View style={styles.container}>
        <TextInput style={styles.textField} placeholder='Username'></TextInput>
        <TextInput style={styles.textField} placeholder='Email'></TextInput>
        <TextInput style={styles.textField} placeholder='Password' secureTextEntry={true}></TextInput>
        <TextInput style={styles.textField} placeholder='Confirm Password' secureTextEntry={true}></TextInput>
        </View>)
    }
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        backgroundColor : '#302b23',
        alignItems : 'center'
    },
    textField : {
        width : '75%',
        height : 30,
        margin : 8,
        padding : 6,
        backgroundColor : 'white',
        borderRadius : 5
    }
})