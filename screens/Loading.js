import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, Button, FlatList, TouchableHighlight } from 'react-native';

export default class Loading extends React.Component
{
    render(){
        return <View style={{width:'100%',height:'100%'}}>
            <Image resizeMode ='cover' source={require('../assets/Images/Loading.jpg')} style={{width:'100%',height:'100%'}} />            
        </View>;
    }
}