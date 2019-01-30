import React, { Component } from 'react';
import {Image, View, Text,Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import WalletRoot from './WalletRoot';
import DiscountDetail from '../discounts/DiscountDetail'
import Colors from '../../constants/Colors'
import ClaimDiscount from '../discounts/ClaimDiscount';

export const WalletNavigator = createStackNavigator({
  root : {
    screen : WalletRoot
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

export default WalletNavigator