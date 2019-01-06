import React, { Component } from 'react';
import {Image, View, Text,Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from './Login';
import SignUp from './Signup';

export const HomeNavigator = createStackNavigator({
  root : {
    screen : Login
  },
  signUp : {
    screen : SignUp
  }
})

export default HomeNavigator 