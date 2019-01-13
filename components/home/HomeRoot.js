import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, Button, FlatList, TouchableHighlight } from 'react-native';

import {Image as CachedImage,CacheManager} from 'react-native-expo-image-cache';
import Colors from '../../constants/Colors';
import MerchantsManager from '../../managers/MerchantsManager'
import NetworkManager from '../../managers/NetworkManager'
import { EventRegister } from 'react-native-event-listeners'

// CacheManager.clearCache();

export class HomeRoot extends Component {
    state = {
        refresh: false
    }

    static navigationOptions = {
        title: 'Afterdark',
        headerStyle: {
            backgroundColor: Colors.black
        },
        headerTintColor: Colors.themeLight,
        headerTitle: <Image style={{ height: 40, width: 200, marginTop: 0, resizeMode: 'contain' }} source={require('../../assets/Images/AfterDark_logo_white.png')} />
    }

    constructor(props) {
        super(props);

        CacheManager.clearCache();

        this.RefreshMerchantList = this.RefreshMerchantList.bind(this);
        this.DisplayDetailViewWithMerchant = this.DisplayDetailViewWithMerchant.bind(this)
        this.state = {
            refresh: true
        }

        //subscribe to merchant load event
        EventRegister.addEventListener('MERCHANTS_LOADED', (merchants) => {
            this.RefreshMerchantList(merchants);
        })
    }


    componentDidMount()
    {
        this.RefreshMerchantList(MerchantsManager.merchants)
    }

    DisplayDetailViewWithMerchant(merchant){        
        this.props.navigation.navigate('merchantDetail',{merchant: merchant})
    }
    RefreshMerchantList(merchants) {                
        this.setState({
            merchants : merchants,
            refresh: !this.state.refresh
        })
    }

    render() {
        return (
            <View style={{ backgroundColor: Colors.black, flex: 1 }}>
                <FlatList
                    data={this.state.merchants}
                    extraData={this.state.refresh}
                    renderItem={({ item }) => <MerchantListItem merchant={item} onPress={this.DisplayDetailViewWithMerchant} />}
                    keyExtractor={(item) => item.name}
                />
            </View>
        )
    }
}

export default HomeRoot

class MerchantListItem extends Component {

    constructor(props) {
        super(props);        
    }

    render() {        
        return <View style={styles.merchantListItemContainerView}>
            <TouchableHighlight activeOpacity={0.5} underlayColor={Colors.white} style={styles.merchantListItemTouchable} onPress={() => this.props.onPress(this.props.merchant)}>
                <CachedImage
                    resizeMode='cover'
                    {...{ 
                        uri: `${NetworkManager.domain}/GetImageForMerchant/${this.props.merchant.id}` ,
                        cache : 'reload'
                    }}
                    style={styles.merchantListItemImage}
                />                
            </TouchableHighlight>

            <View pointerEvents="none" style={styles.textContainer}>
                <Text style={styles.merchantListItemText}>
                    {this.props.merchant.name}
                </Text>

                <Text style={styles.merchantListItemSubText}>
                    {this.props.merchant.address_summary}
                </Text>
                <Text style={styles.merchantListItemSubText}>
                    {this.props.merchant.price}
                </Text>
            </View>            

        </View>
    }

}

const styles = StyleSheet.create({
    merchantListItemContainerView: {        
        height: 200,
        flex : 1,
        justifyContent: 'center',                
    },
    merchantListItemTouchable: {
        flex: 1,
        margin : 0    
    },
    textContainer : {
        position: 'absolute',
        flexDirection : 'column',
        alignSelf : 'center',      
        justifyContent : 'center',  
        height : '70%',
        width : '100%'
    },
    merchantListItemText: {        
        // position : 'absolute',     
        top : 22, 
        color: Colors.white,
        fontSize: 35,
        textAlign: "center",
        alignSelf: 'center',
        fontFamily: 'avenir-bold'
    },
    merchantListItemSubText : {        
        bottom: -20,
        color: Colors.white,
        fontSize: 15,
        textAlign: "center",
        alignSelf: 'center',
        fontFamily: 'avenir'
    },
    merchantListItemImage: {
        flex: 1,
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,        
        opacity: 0.4,
        position: 'absolute',        
    }
});