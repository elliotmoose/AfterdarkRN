// BarDetail.js

import React, { Component } from 'react';
import {Dimensions, ScrollView,FlatList,TouchableOpacity,StyleSheet, View, Text, Button } from 'react-native';
import {Image} from 'react-native-expo-image-cache';

import DiscountItem from '../discounts/DiscountItem'

import Network from '../../managers/NetworkManager'
import BarsManager from '../../managers/BarsManager'
import Colors from '../../constants/Colors'

import { EventRegister } from 'react-native-event-listeners'

const windowWidth = Dimensions.get('window').width

export class BarDetail extends Component {

    state = {
        selectedTabIndex : 0
    }


    constructor(props){
        super(props)
            
        
        this.DisplayDetailViewWithDiscount = this.DisplayDetailViewWithDiscount.bind(this)
    }

    componentDidMount()
    {        
        this.RefreshDiscountList(BarsManager.discounts)

        //subscribe to discount load event
        EventRegister.addEventListener('DISCOUNTS_LOADED', (discounts) => {
            this.RefreshDiscountList(discounts);
        })
    }

    static navigationOptions = {        
        headerStyle: {
            backgroundColor: Colors.black
        },
        headerTintColor: Colors.themeLight        
    }

    RefreshDiscountList(discounts)
    {        
        const thisBar = this.props.navigation.getParam('bar')
        var thisBarDiscounts = []
        for(discount of discounts)
        {
            if(discount.bar_id == thisBar.id)
            {
                thisBarDiscounts.push(discount)
                console.log(discount.name)
            }            
        }

        if(thisBarDiscounts.length % 2 == 1)
        {
            console.log(thisBarDiscounts.length)
            thisBarDiscounts.push({dummy : true})
        }

        this.setState({
            discounts : thisBarDiscounts,
            refresh:!this.state.refresh
        })
    }

    DisplayDetailViewWithDiscount(discount)
    {
        this.props.navigation.navigate('discountsDetail',{discount: discount})        
    }

    render() {
        
        const { navigation } = this.props;
        const bar = navigation.getParam('bar');        

        return (
            <View style={style.container}>
                <View style={style.imageContainer}>                
                    <Image adjustsFontSizeToFit={true} style = {style.barImage} {...{uri: `${Network.domain}/GetImageForBar/${bar.id}`}} />
                    <Text style={style.barTitle} numberOfLines={2}>
                        {bar.name}
                    </Text>
                </View>
                <View style={style.tabButtonsContainer}>
                    <TouchableOpacity style={[style.tabButton,{
                        backgroundColor : this.state.selectedTabIndex==0?'black':'white'
                    }]}
                    onPressOut={()=>{
                        this.setState({selectedTabIndex : 0})
                    }}
                    >
                        <Text style={[
                            style.tabButtonText,
                            {color : this.state.selectedTabIndex==0?'white':'black'}
                            ]}>                        
                        Afterdark Specials
                        </Text>

                    </TouchableOpacity>

                     <TouchableOpacity style={[style.tabButton,{
                         backgroundColor : this.state.selectedTabIndex==1?'black':'white'
                     }]}
                    onPressOut={()=>{
                        this.setState({selectedTabIndex : 1})
                    }}
                    >
                        <Text style={[
                            style.tabButtonText,
                            {color : this.state.selectedTabIndex==1?'white':'black'}
                        ]}>                        
                        About Us
                        </Text>

                    </TouchableOpacity>
                </View>
                
                <View style={style.contentContainer}>
                        <ScrollView style={{width:'100%', margin : 10}} contentContainerStyle={{flex:1,width : '100%'}}>
                            {/* <View style={{flex:1,width : '100%'}}> */}
                                <FlatList
                                    data={this.state.discounts}
                                    extraData={this.state.refresh}
                                    renderItem={({item}) => {
                                        if(item.dummy)
                                        {                                            
                                            return (<View style={{flex : 1, margin : 5, width: 100}}></View>)
                                        }
                                        else
                                        {
                                            const margin = 5
                                            const discountItemwidth = windowWidth/2-margin*3
                                            return (<DiscountItem discount={item} onPress={()=>{this.DisplayDetailViewWithDiscount(item)}} style={{width : discountItemwidth,height: discountItemwidth*1.2, margin : margin}}/>)
                                        }
                                    }}
                                    keyExtractor={(item) => item.name}
                                    numColumns = {2}
                                    contentContainerStyle={style.discountContainer}
                                    >
                                </FlatList>
                            {/* </View> */}
                        </ScrollView>
                </View>
            </View>
        )
    }
}

export default BarDetail


const style = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor: Colors.black
    },
    imageContainer : {
        flexDirection : 'column',        
        height : 200,   
        alignItems : 'center',
        justifyContent : 'flex-end'             
    },
    barImage: {
        height: '100%',
        width: '100%',
        backgroundColor : Colors.grey
    },
    barTitle : {
        position : 'absolute',
        bottom : 12,
        height: 50,
        width : '80%',
        color : 'white',
        textAlign : 'center',
        fontFamily : 'avenir-bold',
        fontSize : 32,               
        backgroundColor : 'transparent',
        flexWrap : 'wrap',
        flex: 1,        
    },
    tabButtonsContainer: {
        height: 35,
        backgroundColor : 'white',
        flexDirection: 'row'
    },
    tabButton : {                               
        height: '100%',
        width: '50%',         
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'                                                                       
    },
    tabButtonText : {
        textAlign: 'center',                                                     
        width : '100%',     
        fontSize : 15,
        fontFamily : 'avenir-medium'    
    },
    contentContainer : {        
        flex : 1,
        width : '100%',                 
        alignItems: 'center'         
    },
    // discountContainer : {          
    //     display : 'flex',
    //     width : '90%',    
    //     backgroundColor : 'red',           
    //     alignItems : 'flex-start',
    //     flexDirection : 'column',
    //     justifyContent : 'space-around',          
    //     // flexWrap : 'wrap'                                                 
    // }
})