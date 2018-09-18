import React from 'react';
import { AppState,Platform,StatusBar,StyleSheet, Text,View,Button } from 'react-native';
import {AppNavigator} from './Screens/AppNavigator';
import Network from './Managers/NetworkManager'
import BarsManager from './Managers/BarsManager'

export default class App extends React.Component {    


  componentDidMount() {
    Network.GetBars(function(bars){
      BarsManager.OnBarsLoaded(bars);
    });    
  }

  render() {    
    StatusBar.setBarStyle('light-content', true);
    return (      
      <AppNavigator/>      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
