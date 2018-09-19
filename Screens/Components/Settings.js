// Settings.js

import React, { Component } from 'react';
import { View, Text,Button} from 'react-native';

export class Settings extends Component {
  render() {
    return (
      <View>
        <Text>This is the settings screen</Text>
        <Button onPress={() => this.props.navigation.navigate('Go To Home')} title="Home"/>
      </View>
    )
  }
}

export default Settings