import React, { Component } from 'react';
import {Image, View, Text,Button,FlatList} from 'react-native';
import Colors from '../../../Assets/UI Scripts/Colors';
import BarsManager from '../../../Managers/BarsManager'

export class HomeRoot extends Component {


    constructor(){
        BarsManager.barsEvent.on('event',function(){
            console.log("Bars Loaded")
            this.setState({ 
                refresh: !this.state.refresh
            })
        })
    }

    static navigationOptions = {
        title: 'Afterdark',
        headerStyle: {          
            backgroundColor : Colors.black
        },
        headerTintColor : Colors.themeLight,
        headerTitle: <Image style={{height:40,width:200,marginTop:0,resizeMode: 'contain'}} source={require('../../../Assets/Images/AfterDark_logo_white.png')} />
      }

    render() {
      return (
        <FlatList        
        data={BarsManager.bars}
        extraData={this.state.refresh}
        renderItem={({item}) => <Text>{item.name}</Text>}        
        />
      )
    }
}

export default HomeRoot