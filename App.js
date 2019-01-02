import React from 'react';
import {AppState,Platform,StatusBar,StyleSheet, Text,View,Button,SafeAreaView } from 'react-native';
import {Asset,Font} from 'expo'
import {AppNavigator} from './navigation/AppNavigator';
import Loading from './screens/Loading';
import LoginNavigator from './components/login/LoginNavigator';
import Network from './managers/NetworkManager'
import BarsManager from './managers/BarsManager'
import UserManager from './managers/UserManager'
import Colors from './constants/Colors'
import Checkout from './components/ticket/Checkout'
import {EventRegister} from 'react-native-event-listeners';

export default class App extends React.Component {    
  
  state = {
    startedLoad : false,
    isLoading : true,
    isLoggedIn : UserManager.isLoggedIn,
  }
  
  componentDidMount() {
    Network.GetBars(function(bars){
      BarsManager.OnBarsLoaded(bars);
    });    

    Network.GetDiscounts(function(discounts){
      BarsManager.OnDiscountsLoaded(discounts);
    });    

    UserManager.loginCallback = this.loginCallback.bind(this)
  }
  

  loginCallback()
  {
    //updates login state
    this.setState({isLoggedIn: UserManager.isLoggedIn})   
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
          <AppNavigator style={{backgroundColor : '#000'}}/>          
          );
      }
      else
      {
        return (  
          // <View style={{backgroundColor : 'red'}}></View>   
          // <LoginNavigator/> 
          <Checkout/> 
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
