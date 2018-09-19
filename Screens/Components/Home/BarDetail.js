// BarDetail.js

import React, { Component } from 'react';
import { StyleSheet, View,Image, Text, Button } from 'react-native';
import Colors from '../../../Assets/UI Scripts/Colors'
export class BarDetail extends Component {

    static navigationOptions = {        
        headerStyle: {
            backgroundColor: Colors.black
        },
        headerTintColor: Colors.themeLight        
    }


    render() {
        return (
            <View style={style.container}>
                <View style={style.imageContainer}>
                    <Image style = {style.barImage} source={{uri: "http://localhost:8080/GetImageForBar/0"}}/>
                </View>
                
            </View>
        )
    }
}

export default BarDetail


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black
    },
    imageContainer : {
        height : 200,        
    },
    barImage: {
        flex: 1,
        backgroundColor : Colors.grey
    }
})