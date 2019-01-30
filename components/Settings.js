// Settings.js

import React, { Component } from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList, View, Text, Button, Alert } from 'react-native';
import Colors from '../constants/Colors'
import UserManager from '../managers/UserManager'

export class Settings extends Component {
    render() {
        return (
            <SafeAreaView style={{backgroundColor: 'black', flex : 1}}>
                <View style={{backgroundColor:'black',height: 50,width: '100%', justifyContent:'center', alignItems:'center', borderBottomColor:'gray', borderBottomWidth: 0.5}}>
                    <Text style={{color:Colors.themeLight, fontFamily:'avenir-medium', fontSize: 24, textAlign: 'center'}}>
                        Settings
                    </Text>
                </View>
                <ScrollView style={{flex: 1, backgroundColor: Colors.themeBackground}}>
                    <View style={styles.section}>
                        <Text style={styles.sectionText}>About</Text>
                    </View>
                    <TouchableOpacity style={styles.menuOption}>
                        <Text style={styles.menuOptionText}>Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuOption}>
                        <Text style={styles.menuOptionText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <View style={styles.section}>
                        <Text style={styles.sectionText}>Account</Text>
                    </View>
                    <TouchableOpacity style={styles.menuOption} onPress={()=>{
                        Alert.alert('Logout','Are you sure you want to log out?', [{
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        {
                            text: 'Logout',
                            style: 'destructive',
                            onPress: ()=>{UserManager.logout()}
                        }])
                    }}>
                        <Text style={styles.menuOptionText}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default Settings

const styles = StyleSheet.create({
    section : {
        width: '100%',
        backgroundColor : Colors.themeLight,
        height: 26,
        justifyContent: 'center'
    },
    sectionText : {
        marginLeft: 12,
        color: 'white',   
        fontFamily : 'avenir-medium',
        fontSize: 16    
    },
    menuOption : {
        marginTop : 2,
        height : 50,
        width: '100%',
        justifyContent: 'center',
        backgroundColor : 'black'
    },
    menuOptionText : {
        marginLeft: 15,
        color: 'white',   
        fontFamily : 'avenir-medium',
        fontSize: 18     
    }
})