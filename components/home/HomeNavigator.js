import React, { Component } from 'react';
import {Image, View, Text,Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeRoot from './HomeRoot';
import BarDetail from './BarDetail';
import DiscountDetail from '../discounts/DiscountDetail'

export const HomeNavigator = createStackNavigator({
  root : {
    screen : HomeRoot
  },
  barDetail : {
    screen : BarDetail
  },
  discountsDetail : {
    screen : DiscountDetail
  }
})

export default HomeNavigator