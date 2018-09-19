import React, { Component } from 'react';
import {Image, View, Text,Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeRoot from './HomeRoot';
import BarDetail from './BarDetail';

export const HomeNavigator = createStackNavigator({
  root : {
    screen : HomeRoot
  },
  barDetail : BarDetail
})

export default HomeNavigator