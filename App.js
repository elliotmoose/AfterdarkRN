import React from 'react';
import { AppState, Platform, StatusBar, StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { Asset, Font } from 'expo'
import { AppNavigator } from './components/navigators/AppNavigator';
import Loading from './screens/Loading';
import LoginNavigator from './components/login/LoginNavigator';
// import NetworkManager from './managers/NetworkManager'
import MerchantsManager from './managers/MerchantsManager'
import DiscountsManager from './managers/DiscountsManager'
import UserManager from './managers/UserManager'
import Colors from './constants/Colors'
import { EventRegister } from 'react-native-event-listeners';
import Signup from './components/login/Signup';
import Checkout from './components/payments/Checkout';
import TicketScanning from './components/merchant/TicketScanning'

export default class App extends React.Component {

    state = {
        startedLoad: false,
        isLoading: true,
        isLoggedIn: UserManager.isLoggedIn,
    }

    componentWillMount() {
        UserManager.loginCallback = this.loginCallback.bind(this);        
        
        if (!this.state.startedLoad) {
            this.setState({startedLoad: true})
            this.initialAppLoad();            
        }


        try {
            MerchantsManager.GetMerchants();    
            DiscountsManager.GetDiscounts();    
            MerchantsManager.GetEvents();    
        } catch (error) {
            
        }
    }

    componentDidMount() {

    }

    async initialAppLoad(){
        await UserManager.load();        
        await this.loadResources();        
        this.setState({ isLoading: false });
    }

    async loginCallback() {
        //updates login state
        this.setState({ isLoggedIn: !(UserManager.userData===null)})

    }

    render() {
        StatusBar.setBarStyle('light-content', true);

        if (this.state.isLoading) {
            return (
                <Loading />
            );
        }
        else {
            if (UserManager.userData) {
                if (UserManager.userData.type == 'USER') {
                    return (
                        <AppNavigator style={{ backgroundColor: 'black'}}/>                                              
                    );
                }
                else if (UserManager.userData.type == 'MERCHANT') {
                    console.log('merchhhhh')
                    return (
                        <TicketScanning style={{ backgroundColor: '#000' }} />
                    );
                }
                else {
                    return (
                        <AppNavigator style={{ backgroundColor: '#000' }} />
                    );
                }
            }
            else {
                return (
                    // <View style={{backgroundColor : 'red'}}></View>   
                    <LoginNavigator />
                    // <Signup></Signup>
                    // <Checkout/> 
                    // <AddPaymentMethod/>
                );
            }

        }
    }

    async loadResources() {
        //load
        await Font.loadAsync({
            'mohave': require('./assets/fonts/Mohave/Mohave-Bold.otf'),
            'avenir': require('./assets/fonts/AvenirNextCondensed/AvenirNextCondensed-Regular.ttf'),
            'avenir-bold': require('./assets/fonts/AvenirNextCondensed/AvenirNextCondensed-Bold.ttf'),
            'avenir-medium': require('./assets/fonts/AvenirNextCondensed/AvenirNextCondensed-Medium.ttf')
        })
    }

    loadingComplete() {
        
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
