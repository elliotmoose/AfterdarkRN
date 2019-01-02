import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, Button, FlatList, TouchableHighlight } from 'react-native';

import {Image as CachedImage,CacheManager} from 'react-native-expo-image-cache';
import Colors from '../../constants/Colors';
import BarsManager from '../../managers/BarsManager'
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

        this.RefreshBarList = this.RefreshBarList.bind(this);
        this.DisplayDetailViewWithBar = this.DisplayDetailViewWithBar.bind(this)
        this.state = {
            refresh: true
        }

        //subscribe to bar load event
        EventRegister.addEventListener('BARS_LOADED', (bars) => {
            this.RefreshBarList(bars);
        })
    }

    componentDidMount()
    {
        this.RefreshBarList(BarsManager.bars)
    }

    DisplayDetailViewWithBar(bar){        
        this.props.navigation.navigate('barDetail',{bar: bar})
    }
    RefreshBarList(bars) {                
        this.setState({
            bars : bars,
            refresh: !this.state.refresh
        })
    }

    render() {
        return (
            <View style={{ backgroundColor: Colors.black, flex: 1 }}>
                <FlatList
                    data={this.state.bars}
                    extraData={this.state.refresh}
                    renderItem={({ item }) => <BarListItem bar={item} onPress={this.DisplayDetailViewWithBar} />}
                    keyExtractor={(item) => item.name}
                />
            </View>
        )
    }
}

export default HomeRoot

class BarListItem extends Component {

    constructor(props) {
        super(props);        
    }

    render() {
        return <View style={styles.barListItemContainerView}>
            <TouchableHighlight activeOpacity={0.5} underlayColor={Colors.white} style={styles.barListItemTouchable} onPress={() => this.props.onPress(this.props.bar)}>
                <CachedImage
                    resizeMode='cover'
                    {...{ uri: `${NetworkManager.domain}/GetImageForBar/${this.props.bar.id}` }}
                    style={styles.barListItemImage}
                />                
            </TouchableHighlight>

            <View pointerEvents="none" style={styles.textContainer}>
                <Text style={styles.barListItemText}>
                    {this.props.bar.name}
                </Text>

                <Text style={styles.barListItemSubText}>
                    {this.props.bar.address_summary}
                </Text>
                <Text style={styles.barListItemSubText}>
                    {this.props.bar.price}
                </Text>
            </View>            

        </View>
    }

}

const styles = StyleSheet.create({
    barListItemContainerView: {        
        height: 200,
        flex : 1,
        justifyContent: 'center',                
    },
    barListItemTouchable: {
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
    barListItemText: {        
        // position : 'absolute',     
        top : 22, 
        color: Colors.white,
        fontSize: 35,
        textAlign: "center",
        alignSelf: 'center',
        fontFamily: 'avenir-bold'
    },
    barListItemSubText : {        
        bottom: -20,
        color: Colors.white,
        fontSize: 15,
        textAlign: "center",
        alignSelf: 'center',
        fontFamily: 'avenir'
    },
    barListItemImage: {
        flex: 1,
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,        
        opacity: 0.4,
        position: 'absolute',        
    }
});