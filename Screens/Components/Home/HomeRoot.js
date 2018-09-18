import React, { Component } from 'react';
import { Image, View, Text, Button, FlatList } from 'react-native';
import Colors from '../../../Assets/UI Scripts/Colors';
import BarsManager from '../../../Managers/BarsManager'

export class HomeRoot extends Component {
    state = {
        refresh: false
    }

    getInitialState()
    {        
        return state;
    }

    constructor(){
        super();
        this.RefreshBarList = this.RefreshBarList.bind(this);
        this.state = {
            refresh : true
        }
    }

    componentDidMount() {
        console.log('set');
    }

    RefreshBarList(){        
        this.state.bars = BarsManager.bars
        this.setState({
            refresh: !this.state.refresh
        })
    }

    static navigationOptions = {
        title: 'Afterdark',
        headerStyle: {
            backgroundColor: Colors.black
        },
        headerTintColor: Colors.themeLight,
        headerTitle: <Image style={{ height: 40, width: 200, marginTop: 0, resizeMode: 'contain' }} source={require('../../../Assets/Images/AfterDark_logo_white.png')} />
    }

    render() {

        return (
            <View>
                <FlatList
                    data={this.state.bars}
                    extraData={this.state.refresh}
                    renderItem={({ item }) => <Text>{item.name}</Text>}
                    keyExtractor={(item)=>item.name}
                />

                <Button title="hello" onPress={this.RefreshBarList} />
            </View>
        )
    }
}

export default HomeRoot