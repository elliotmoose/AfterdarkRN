import React, { Component } from 'react';
import {Image, View, Text,Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DiscountsRoot from './DiscountsRoot';
import DiscountDetail from './DiscountDetail'
import Colors from '../../constants/Colors'
import ClaimDiscount from './ClaimDiscount';

export const DiscountsNavigator = createStackNavigator({
  root : {
    screen : DiscountsRoot
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
  claimDiscount : {
    screen : ClaimDiscount,
    navigationOptions : {
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTitle : 'Claim',
      headerTintColor: Colors.themeLight     
    }
  },
//   eventsDetail : {
//     screen : EventsDetail,
//     navigationOptions : {
//       headerStyle: {
//         backgroundColor: 'black'
//       },
//       headerTintColor: Colors.themeLight     
//     }
//   }
})

export default DiscountsNavigator