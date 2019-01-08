import React, { Component } from 'react';
import {Image, View, Text,Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from './Login';
import SignUp from './Signup';
import Colors from '../../constants/Colors'
export const HomeNavigator = createStackNavigator({
  root : {
    screen : Login,
    navigationOptions : {
      headerStyle : {
        backgroundColor : 'black'
      }
    }    
  },
  signUp : {
    screen : SignUp,
    navigationOptions : {
      headerStyle : {        
        backgroundColor : 'black'
      },
      headerTintColor: Colors.themeLight,
    }  
  }
})

export default HomeNavigator 