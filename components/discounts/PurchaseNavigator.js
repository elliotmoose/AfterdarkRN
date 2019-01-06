

import React, { Component } from 'react';
import {Image, View, Text,Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Checkout from '../../components/ticket/Checkout'
import AddPaymentMethod from '../../components/ticket/AddPaymentMethod';
import DiscountDetail from '../discounts/DiscountDetail'

export const PurchaseNavigator = createStackNavigator({
  root : {
    screen : DiscountDetail,

  },
  checkout : {
    screen : Checkout
  },
  addPaymentMethod : {
    screen : AddPaymentMethod
  },  
})

export default PurchaseNavigator