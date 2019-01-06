import React, { Component } from 'react';
import {TouchableOpacity, Text, TextInput , View, StyleSheet, Button,Alert } from 'react-native'
const InputAccessoryView = require('InputAccessoryView')

import Colors from '../../constants/Colors'
import KeyboardShiftView from '../reusable/KeyboardShiftView';
import Picker from 'react-native-picker-select'

const UserManager = require('../../managers/UserManager');
export default class Signup extends Component
{
    static navigationOptions = ({navigation})=>({
        headerStyle: {
            backgroundColor: Colors.black
        },
        headerTintColor: Colors.themeLight,
        headerRight : (<TouchableOpacity style={{marginRight : 16}} onPress={navigation.getParam('signUp')}>
            <Text style={{color : Colors.themeLight, fontFamily : 'avenir-bold',fontSize : 15}}>Sign Up</Text>
        </TouchableOpacity>)      
    })

    state = {
        genderOptions : [
            {
                label: 'Male',
                value: 'male', 
                key: 'male', 
                color: 'black'
            },
            {
                label: 'Female', 
                value: 'female', 
                key: 'female', 
                color: 'black'
            }
        ],
        username : 'asd',
        password : 'asd',
        confirmPassword : 'asd',
        email : '@.'
    }

    
          
    componentWillMount()
    {
        this.props.navigation.setParams({ signUp: this.signUp.bind(this)});

        this.signUp = this.signUp.bind(this)
        this.isFieldEmpty = this.isFieldEmpty.bind(this)
    }
    
    async signUp()
    {
        if(this.isFieldEmpty('username') || this.isFieldEmpty('email') || this.isFieldEmpty('password') || this.isFieldEmpty('confirmPassword'))
        {
            Alert.alert('Oops!','Please fill in the mandatory fields')
        }
        else if(!this.isValidEmail(this.state.email))
        {
            Alert.alert('Oops!','Please give a valid email')
        }
        else
        {         
            await UserManager.register(this.state.username,this.state.password,this.state.email,this.state.gender,this.state.age)            
        }        
    }

    isFieldEmpty(field)
    {
        if (this.state[field] === undefined || this.state[field] == null || this.state[field] == "")
        {
            console.log(field + 'is not filled')
            return true
        }

        return false
    }

    isValidEmail(email)
    {
        if(!email.includes('@') || !email.includes('.'))
        {
            return false
        }

        return true
    }
    render()
    {
        const inputAccessoryViewID = 'inputAccessoryView1';

        return (

        <View style={styles.container}>
            {/* <KeyboardShiftView > */}
                <TextInput autoCapitalize='none' style={[styles.textField,{marginTop : 32}]} placeholder='Username' onChangeText={(value)=>{this.setState({username : value})}}></TextInput>
                <TextInput autoCapitalize='none' style={styles.textField} placeholder='Email' onChangeText={(value)=>{this.setState({email : value})}}></TextInput>
                <TextInput style={styles.textField} placeholder='Password' secureTextEntry={true} onChangeText={(value)=>{this.setState({password : value})}}></TextInput>
                <TextInput style={styles.textField} placeholder='Confirm Password' secureTextEntry={true} onChangeText={(value)=>{this.setState({confirmPassword : value})}}></TextInput>
                <TextInput style={styles.textField} keyboardType = 'numeric' placeholder='Age' onChangeText={(value)=>{this.setState({age : value})}}></TextInput>

                <View style={{width:'70%',height:40, flexDirection:'row', marginTop: 10}}>
                    <Text style={{flex : 1,color:'white',lineHeight: 40}}>
                        Gender:
                    </Text>
                    <View style={{flex : 3}}>
                        <Picker style={{...pickerStyle}} items={this.state.genderOptions} selectedValue="Male" onValueChange={(value)=>{console.log(value)}}></Picker>
                    </View>                

                </View>
                
            {/* </KeyboardShiftView> */}

            {/* <InputAccessoryView nativeID={inputAccessoryViewID} style={{width : '100%'}}>
                <View style={{backgroundColor: 'white', width : '100%'}}>
                <Button
                    onPress={() => this.setState({text: 'Placeholder Text'})}
                    title="Reset Text"
                />
            </View>
            </InputAccessoryView> */}
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
    },
    gender : {
        inputIOS: {
            fontSize: 8,
            paddingTop: 1,
            paddingHorizontal: 1,
            paddingBottom: 1,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4,
            backgroundColor: 'white',
            color: 'black',
        },
        inputAndroid: {
            fontSize: 11,
            paddingTop: 13,
            paddingHorizontal: 10,
            paddingBottom: 12,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4,
            backgroundColor: 'white',
            color: 'black',
        },
    }
})

const pickerStyle = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
    inputAndroid: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        
    },
    inputIOSContainer : {
        padding : 0,
    }
})