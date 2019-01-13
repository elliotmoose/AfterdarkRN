import React, { Component } from 'react';
import {Image, View, Text,Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeRoot from './HomeRoot';
import MerchantDetail from './MerchantDetail';
import DiscountDetail from '../discounts/DiscountDetail'
import EventsDetail from '../events/EventDetail'
import Colors from '../../constants/Colors'

export const HomeNavigator = createStackNavigator({
  root : {
    screen : HomeRoot
  },
  merchantDetail : {
    screen : MerchantDetail
  },
  discountsDetail : {
    screen : DiscountDetail,
    navigationOptions : {
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTintColor: Colors.themeLight     
    }
  },
  eventsDetail : {
    screen : EventsDetail,
    navigationOptions : {
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTintColor: Colors.themeLight     
    }
  }
})

export default HomeNavigator