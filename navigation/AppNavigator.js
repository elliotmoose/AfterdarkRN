import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import HomeNavigator from '../components/home/HomeNavigator';
import Settings from '../components/Settings';
import Discounts from '../components/Discounts';
import Wallet from '../components/Wallet';
import Colors from '../constants/Colors';
import {Image} from 'react-native';

export var AppNavigator = createBottomTabNavigator({
    Home : {
        screen: HomeNavigator,
        navigationOptions: () => ({
            title: "Home",
            tabBarIcon: ({tintColor}) => <Image style={{height:27,width:40,marginTop:4,resizeMode: 'contain', tintColor : tintColor}} source={require('../assets/Images/Drink.png')}/>
        })        
    },
    Discounts: {
        screen : Discounts,
        navigationOptions: () => ({
            title: "Discounts",
            tabBarIcon: ({tintColor}) => <Image style={{height:27,width:40,marginTop:4,resizeMode: 'contain', tintColor : tintColor}} source={require('../assets/Images/Discount.png')}/>
        })  
    },
    Wallet : {
        screen : Wallet,
        navigationOptions: () => ({
            title: "My Wallet",
            tabBarIcon: ({tintColor}) => <Image style={{height:27,width:40,marginTop:4,resizeMode: 'contain', tintColor : tintColor}} source={require('../assets/Images/Wallet.png')}/>
        })          
    },
    Settings : {
        screen: Settings,
        navigationOptions: () => ({
            title: "Settings",
            tabBarIcon: ({tintColor}) => <Image style={{height:27,width:40,marginTop:4,resizeMode: 'contain', tintColor : tintColor}} source={require('../assets/Images/Settings.png')}/>
        })  
    }
  },{
    tabBarOptions: {
        showIcon: true,
        activeBackgroundColor : Colors.themeLight,
        activeTintColor : Colors.black,
        inactiveBackgroundColor : Colors.black,
        inactiveTintColor : Colors.themeLight        
      }
  })