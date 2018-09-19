import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, Button, FlatList, TouchableHighlight } from 'react-native';
import Colors from '../../../Assets/UI Scripts/Colors';
import BarsManager from '../../../Managers/BarsManager'
import NetworkManager from '../../../Managers/NetworkManager'
import { EventRegister } from 'react-native-event-listeners'



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
        headerTitle: <Image style={{ height: 40, width: 200, marginTop: 0, resizeMode: 'contain' }} source={require('../../../Assets/Images/AfterDark_logo_white.png')} />
    }

    constructor(props) {
        super(props);

        this.RefreshBarList = this.RefreshBarList.bind(this);
        this.DisplayDetailViewWithBar = this.DisplayDetailViewWithBar.bind(this)
        this.state = {
            refresh: true
        }

        EventRegister.addEventListener('BARS_LOADED', () => {
            this.RefreshBarList();
        })
    }

    DisplayDetailViewWithBar(id){
        console.log('displaying:' + id)
        this.props.navigation.navigate('barDetail')
    }
    RefreshBarList() {
        this.state.bars = BarsManager.bars
        this.setState({
            refresh: !this.state.refresh
        })
    }

    render() {

        return (
            <View style={{ backgroundColor: Colors.black, flex: 1 }}>
                <FlatList
                    data={this.state.bars}
                    extraData={this.state.refresh}
                    renderItem={({ item }) => <BarListItem bar={item} callback={this.DisplayDetailViewWithBar} />}
                    keyExtractor={(item) => item.name}
                />
            </View>
        )
    }
}

export default HomeRoot


class BarListItem extends Component {

    state =
        {
            bar: ""
        }

    constructor(props) {
        super(props);
        this.state.bar = props.bar
        this.state.callback = props.callback
    }

    render() {
        return <View style={styles.barListItemContainerView}>
            <TouchableHighlight activeOpacity={0.5} underlayColor={Colors.white} style={styles.barListItemTouchable} onPress={() => this.state.callback(this.state.bar.id)}>
                <Image
                    resizeMode='cover'
                    source={{ uri: `${NetworkManager.domain}GetImageForBar/${this.state.bar.id}` }}
                    style={styles.barListItemImage}
                />
                
            </TouchableHighlight>

            <Text pointerEvents="none" style={styles.barListItemText}>
                {this.state.bar.name}
            </Text>
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
    barListItemText: {        
        position: 'absolute',
        color: Colors.white,
        fontSize: 30,
        textAlign: "center",
        alignSelf: 'center'
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