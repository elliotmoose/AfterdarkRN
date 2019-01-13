

import React, { Component } from 'react';
import { Image, View, Text, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Checkout from '../ticket/Checkout'
import AddPaymentMethod from '../ticket/AddPaymentMethod';
import PaymentMethods from '../ticket/PaymentMethods';
import DiscountDetail from '../discounts/DiscountDetail';
import Colors from '../../constants/Colors';

export const PaymentNavigator = ((props)=>{
    return createStackNavigator({
    root: {
        screen: Checkout
    },
    paymentMethods: {
        screen: PaymentMethods
    },
    addPaymentMethod: {
        screen: AddPaymentMethod
    },

},{
    initialRouteName : 'root',
    initialRouteParams : {...this.props}
})})();

export default PaymentNavigator