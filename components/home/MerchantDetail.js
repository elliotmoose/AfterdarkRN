import React, { Component } from 'react';
import {Dimensions, ScrollView,FlatList,TouchableOpacity,StyleSheet, View, Text, Button } from 'react-native';
import {Image} from 'react-native-expo-image-cache';

import EventItem from '../events/EventItem'
import DiscountItem from '../discounts/DiscountItem'

import Network from '../../managers/NetworkManager'
import MerchantsManager from '../../managers/MerchantsManager'
import Colors from '../../constants/Colors'

import { EventRegister } from 'react-native-event-listeners'

const windowWidth = Dimensions.get('window').width

export class MerchantDetail extends Component {

    state = {
        selectedTabIndex : 0,
        events : [],
        discounts : []
    }


    constructor(props){
        super(props)
                    

        this.displayDetailViewWithDiscount = this.displayDetailViewWithDiscount.bind(this)
        this.displayDetailViewWithEvent = this.displayDetailViewWithEvent.bind(this)
        
        this._renderTabBarButtons = this._renderTabBarButtons.bind(this)
    }

    componentDidMount()
    {        
        let self = this;
        this.refreshDiscountList(MerchantsManager.discounts)
        this.refreshEventsList(MerchantsManager.events)
        
        //subscribe to discount load event
        EventRegister.addEventListener('DISCOUNTS_LOADED', (discounts) => {            
            self.refreshDiscountList(discounts);
            self.updateTabSelection()
        })

        EventRegister.addEventListener('EVENTS_LOADED', (events)=>{
            self.refreshEventsList(events)
            self.updateTabSelection()
        })

        this.updateTabSelection()
    }

    static navigationOptions = {        
        headerStyle: {
            backgroundColor: Colors.black
        },
        headerTintColor: Colors.themeLight        
    }

    refreshEventsList(events)
    {
        const thisMerchant = this.props.navigation.getParam('merchant')
        var thisMerchantEvents = []

        for(event of events)
        {
            if(event.merchant_id == thisMerchant.id)
            {
                thisMerchantEvents.push(event)
                console.log(event.name)
            }            
        }

        if(thisMerchantEvents.length % 2 == 1)
        {
            thisMerchantEvents.push({dummy : true})
        }

        this.setState({
            events : thisMerchantEvents,
            refresh:!this.state.refresh
        },function(){
            this.updateTabSelection()
        })
    }

    refreshDiscountList(discounts)
    {        
        
        const thisMerchant = this.props.navigation.getParam('merchant')
        let thisMerchantDiscounts = []
        for(discount of discounts)
        {
            if(discount.merchant_id == thisMerchant.id)
            {
                thisMerchantDiscounts.push(discount)
                console.log(discount.name)
            }            
        }

        if(thisMerchantDiscounts.length % 2 == 1)
        {
            thisMerchantDiscounts.push({dummy : true})
        }

        this.setState({
            discounts : thisMerchantDiscounts
            // refresh:!this.state.refresh
        },function(){
            this.updateTabSelection()
        })
    }

    updateTabSelection()
    {
        if(this.state.events.length == 0)
        {
            if(this.state.discounts.length == 0)
            {
                this.setState({selectedTabIndex : 2})
            }
            else
            {   
                this.setState({selectedTabIndex : 1})
            }
        }
        else
        {
            this.setState({selectedTabIndex : 0})
        }
    }

    displayDetailViewWithDiscount(discount)
    {
        this.props.navigation.navigate('discountsDetail',{discount: discount})        
    }

    displayDetailViewWithEvent(event)
    {
        this.props.navigation.navigate('eventsDetail',{event: event})
    }

    _renderAbout()
    {

    }
    
    _renderEvents()
    {
        return <ScrollView style={{width:'100%', margin : 10}} contentContainerStyle={{flex:1,width : '100%'}}>
        {/* <View style={{flex:1,width : '100%'}}> */}
            <FlatList
                data={this.state.events}
                extraData={this.state.refresh}
                renderItem={({item}) => {
                    if(item.dummy)
                    {                                            
                        return (<View style={{flex : 1, margin : 5, width: 100}}></View>)
                    }
                    else
                    {
                        const margin = 5
                        const eventItemwidth = windowWidth-margin*2
                        return (<EventItem event={item} onPress={()=>{this.displayDetailViewWithEvent(item)}} style={{width : eventItemwidth,height: eventItemwidth*0.6, margin : margin}}/>)
                    }
                }}
                keyExtractor={(item) => item.name}
                contentContainerStyle={style.discountContainer}
                key='events'
                >
            </FlatList>
        {/* </View> */}
        </ScrollView>
    }

    _renderDiscounts()
    {
        return <ScrollView style={{width:'100%', margin : 10}} contentContainerStyle={{flex:1,width : '100%'}}>
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
                                            return (<DiscountItem discount={item} onPress={()=>{this.displayDetailViewWithDiscount(item)}} style={{width : discountItemwidth,height: discountItemwidth*1.2, margin : margin}}/>)
                                        }
                                    }}
                                    keyExtractor={(item) => item.name}
                                    numColumns = {2}
                                    key='discounts'
                                    contentContainerStyle={style.discountContainer}
                                    >
                                </FlatList>
                            {/* </View> */}
                        </ScrollView>
    }

    _renderTabBarButtons()
    {
        return <View style={style.tabButtonsContainer}>            
            {this.state.events.length != 0 ? this._renderTabButton(0, 'Events') : ()=>{}}
            {this.state.discounts.length != 0 ? this._renderTabButton(1, 'Discounts') : ()=>{}}
            {this._renderTabButton(2,'About Us')}  
        </View>
    }    
    _renderTabButton(index, title)
    {
        return <TouchableOpacity style={[style.tabButton,{
            backgroundColor : this.state.selectedTabIndex==index?'black':'white'
        }]}
        onPressOut={()=>{
            this.setState({selectedTabIndex : index})
        }}
        >
            <Text style={[
                style.tabButtonText,
                {color : this.state.selectedTabIndex==index?'white':'black'}
            ]}>                        
            {title}
            </Text>

        </TouchableOpacity>   
    }

    render() {
        
        const { navigation } = this.props;
        const merchant = navigation.getParam('merchant');        

        return (
            <View style={style.container}>
                <View style={style.imageContainer}>                
                    <Image adjustsFontSizeToFit={true} style = {style.merchantImage} {...{
                        uri: `${Network.domain}/GetImageForMerchant/${merchant.id}`,
                        cache : 'reload'
                    }} />
                    <Text style={style.merchantTitle} numberOfLines={2}>
                        {merchant.name}
                    </Text>
                </View>
                
                {this._renderTabBarButtons()}
                
                <View style={style.contentContainer}>

                {
                    this.state.selectedTabIndex == 0 ? this._renderEvents() : this.state.selectedTabIndex == 1 ? this._renderDiscounts() : this._renderAbout()
                }
                        
                </View>
            </View>
        )
    }
}

export default MerchantDetail


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
    merchantImage: {
        height: '100%',
        width: '100%',
        backgroundColor : Colors.grey
    },
    merchantTitle : {
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