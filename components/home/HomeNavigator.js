import React, { Component } from 'react';
import {Image, View, Text,Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeRoot from './HomeRoot';
import BarDetail from './BarDetail';
import DiscountDetail from '../discounts/DiscountDetail'
import Colors from '../../constants/Colors'

import { PurchaseNavigator } from '../discounts/PurchaseNavigator';

export const HomeNavigator = createStackNavigator({
  root : {
    screen : HomeRoot
  },
  barDetail : {
    screen : BarDetail
  },
  discountsDetail : {
    screen : PurchaseNavigator,
    navigationOptions : {
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTintColor: Colors.themeLight     
    }
  }
})

export default HomeNavigator