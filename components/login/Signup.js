import React, { Component } from 'react';
import {TouchableOpacity, Text, TextInput , View, StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'
import KeyboardShiftView from '../reusable/KeyboardShiftView';
export default class Signup extends Component
{
    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.black
        },
        headerTintColor: Colors.themeLight,
        headerRight : (<TouchableOpacity style={{marginRight : 12}}>
            <Text style={{color : Colors.themeLight}}>Sign Up</Text>
        </TouchableOpacity>)      
    }
    render()
    {
        return (
        <View style={styles.container}>
            <KeyboardShiftView >
                <TextInput style={[styles.textField,{marginTop : 32}]} placeholder='Username'></TextInput>
                <TextInput style={styles.textField} placeholder='Email'></TextInput>
                <TextInput style={styles.textField} placeholder='Password' secureTextEntry={true}></TextInput>
                <TextInput style={styles.textField} placeholder='Confirm Password' secureTextEntry={true}></TextInput>
            </KeyboardShiftView>
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
    signUpButton : {
        marginRight : 12,
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