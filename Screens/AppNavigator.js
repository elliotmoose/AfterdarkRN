import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import HomeNavigator from './Components/Home/HomeNavigator';
import Settings from './Components/Settings';
import Discounts from './Components/Discounts';
import Wallet from './Components/Wallet';
import Colors from '../Assets/UI Scripts/Colors';
import {Image} from 'react-native';

export var AppNavigator = createBottomTabNavigator({
    Home : {
        screen: HomeNavigator,
        navigationOptions: () => ({
            title: "Home",
            tabBarIcon: ({tintColor}) => <Image style={{height:27,width:40,marginTop:4,resizeMode: 'contain', tintColor : tintColor}} source={require('../Assets/Images/Drink.png')}/>
        })        
    },
    Discounts: {
        screen : Discounts,
        navigationOptions: () => ({
            title: "Discounts",
            tabBarIcon: ({tintColor}) => <Image style={{height:27,width:40,marginTop:4,resizeMode: 'contain', tintColor : tintColor}} source={require('../Assets/Images/Discount.png')}/>
        })  
    },
    Wallet : {
        screen : Wallet,
        navigationOptions: () => ({
            title: "My Wallet",
            tabBarIcon: ({tintColor}) => <Image style={{height:27,width:40,marginTop:4,resizeMode: 'contain', tintColor : tintColor}} source={require('../Assets/Images/Wallet.png')}/>
        })          
    },
    Settings : {
        screen: Settings,
        navigationOptions: () => ({
            title: "Settings",
            tabBarIcon: ({tintColor}) => <Image style={{height:27,width:40,marginTop:4,resizeMode: 'contain', tintColor : tintColor}} source={require('../Assets/Images/Settings.png')}/>
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