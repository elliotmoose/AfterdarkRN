import React from 'react';
import {AppState,Platform,StatusBar,StyleSheet, Text,View,Button,SafeAreaView } from 'react-native';
import {Asset,Font} from 'expo'
import {AppNavigator} from './navigation/AppNavigator';
import Loading from './screens/Loading';
import Login from './screens/Login';
import Network from './managers/NetworkManager'
import BarsManager from './managers/BarsManager'
import Colors from './constants/Colors'

export default class App extends React.Component {    
  
  state = {
    startedLoad : false,
    isLoading : true,
    isLoggedIn : false
  }
  
  componentDidMount() {
    Network.GetBars(function(bars){
      BarsManager.OnBarsLoaded(bars);
    });    

    Network.GetDiscounts(function(discounts){
      BarsManager.OnDiscountsLoaded(discounts);
    });    
  }

  render() {    
    StatusBar.setBarStyle('light-content', true);

    
    if(!this.state.startedLoad)
    {
      this.state.startedLoad = true      
      this.loadResources()
    }

    if (this.state.isLoading)
    {
      return (      
        <Loading/>      
      );
    }
    else
    {      
      if(this.state.isLoggedIn)
      {
        return (     
          <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
              <AppNavigator/>      
          </SafeAreaView>        
          );
      }
      else
      {
        return (     
          <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
              <Login/>      
          </SafeAreaView>        
          );
      }
      
    }    
  }

  async loadResources()
  {
    //load
    await Font.loadAsync({
      'mohave' : require('./assets/fonts/Mohave/Mohave-Bold.otf'),
      'avenir' : require('./assets/fonts/AvenirNextCondensed/AvenirNextCondensed-Regular.ttf'),
      'avenir-bold' : require('./assets/fonts/AvenirNextCondensed/AvenirNextCondensed-Bold.ttf'),
      'avenir-medium' : require('./assets/fonts/AvenirNextCondensed/AvenirNextCondensed-Medium.ttf')
    })
    
    await this.loadingComplete()        
  }
  
  loadingComplete()
  {
    this.setState({ isLoading: false });    
    console.log('Loading done')    
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
