
import React, { Component } from 'react';
import {Image, View, Text,Button} from 'react-native';

export class Wallet extends Component {
  render() {
    return (
      <View>
        <Text>This is the home screen</Text>
        <Button onPress={() => this.props.navigation.navigate('Go To Settings')} title="Settings"/>        
      </View>
    )
  }
}

export default Wallet