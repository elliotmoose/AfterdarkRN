import React from 'react';
import { AppState, Platform, StatusBar, StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { Asset, Font } from 'expo'
import { AppNavigator } from './main/AppNavigator';
import Loading from './screens/Loading';
import LoginNavigator from './components/login/LoginNavigator';
import Network from './managers/NetworkManager'
import MerchantsManager from './managers/MerchantsManager'
import UserManager from './managers/UserManager'
import Colors from './constants/Colors'
import Checkout from './components/ticket/Checkout'
import AddPaymentMethod from './components/ticket/AddPaymentMethod';
import { EventRegister } from 'react-native-event-listeners';
import Signup from './components/login/Signup';
import PaymentNavigator from './components/navigators/PaymentNavigator';
import PaymentMethods from './components/ticket/PaymentMethods';

export default class App extends React.Component {

    state = {
        startedLoad: false,
        isLoading: true,
        isLoggedIn: UserManager.isLoggedIn,
        isUser: UserManager.isUser
    }

    componentWillMount() {
        Network.GetMerchants(function (merchants) {
        });

        Network.GetDiscounts(function (discounts) {
        //     MerchantsManager.OnDiscountsLoaded(discounts);
        });

        Network.GetEvents(function (events) {
        //     MerchantsManager.OnEventsLoaded(events)
        });

        UserManager.loginCallback = this.loginCallback.bind(this);
        UserManager.load();
        // UserManager.logout(); 
    }

    componentDidMount() {

    }


    loginCallback() {
        //updates login state
        this.setState({ isLoggedIn: UserManager.isLoggedIn, isUser: UserManager.isUser })
    }

    render() {
        StatusBar.setBarStyle('light-content', true);


        if (!this.state.startedLoad) {
            this.state.startedLoad = true
            this.loadResources()
        }

        if (this.state.isLoading) {
            return (
                <Loading />
            );
        }
        else {
            if (this.state.isLoggedIn) {
                if (this.state.isUser) {
                    return (
                        <AppNavigator style={{ backgroundColor: 'black'}}/>                        
                        // <PaymentNavigator></PaymentNavigator>       
                        // <PaymentMethods></PaymentMethods>                 
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

        await this.loadingComplete()
    }

    loadingComplete() {
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
