// Settings.js
import {EventRegister} from 'react-native-event-listeners';
import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList, View, Text, Image, Alert, Dimensions, ActivityIndicator } from 'react-native';
import Colors, { themeLight } from '../../constants/Colors';
import UserManager from '../../managers/UserManager';
import DiscountsManager from '../../managers/DiscountsManager';

import Modal from 'react-native-modal';
import Dash from 'react-native-dash';
import PaymentConfirmationModal from '../payments/PaymentConfirmationModal';
import TicketDetail from '../events/TicketDetail';
import DiscountItem from '../discounts/DiscountItem';

const windowWidth = Dimensions.get('window').width
const itemMargin = 16
const itemAspect = 2/4
const itemWidth = (windowWidth-itemMargin*2)
const itemHeight = itemWidth*itemAspect
const itemCutoutRadius = 22
const itemContentWidth = itemWidth-itemCutoutRadius*2 - leftMargin - dottedLineMarginRight
const leftMargin = itemCutoutRadius+8;
const dottedLineMarginRight = itemCutoutRadius+60

export class Wallet extends Component {

    static navigationOptions = ({navigation})=>{
        
        const {state} = navigation
        return {
        headerStyle : {
            backgroundColor : 'black',
        },
        headerTintColor: Colors.themeLight,
        headerTitle: 'Wallet',
        headerRight : state.params && state.params.isLoading ?
        <View style={{width: 30,height:30, marginRight: 12}}>
            <ActivityIndicator style={{flex:1}}></ActivityIndicator>
        </View>
        :
        <View style={{width: 22,height:22, marginRight: 15}}>
            <TouchableOpacity style={{flex:1}} onPress={navigation.getParam('refresh')}>
                <Image resizemode='contain' source={require('../../assets/Images/refresh.png')} style={{tintColor: Colors.themeLight,width: '100%', height: '100%',resizeMode: 'contain'}} />
            </TouchableOpacity>
        </View>
        
    }}

    state = {
        selectedTabIndex: 0,
        refresh: false,
        selectedTicket : null,
        discounts: []
    }

    constructor()
    {
        super();
        this.reloadDiscounts = this.reloadDiscounts.bind(this);
        this.displayClaimDiscount = this.displayClaimDiscount.bind(this);
    }

    componentWillMount()
    {
        let self = this;
        //subscribe to discount load event
        this.walletListener = EventRegister.addEventListener('WALLET_LOADED', () => {            
            self.refreshWallet();
            this.props.navigation.setParams({isLoading: false})
        })

        if(this.props.navigation.getParam('forceTickets') === true)
        {
            this.setState({selectedTabIndex: 0})
        }

        
        this.props.navigation.setParams({refresh: ()=>{
            UserManager.loadUserWallet();
            this.props.navigation.setParams({isLoading: true})
        }, isLoading: false})
    }

    componentWillUnmount()
    {
        EventRegister.removeEventListener(this.walletListener)
    }

    componentDidMount()
    {
        let self = this
        // setTimeout(() => {
        //     self.setState({visibleState : 1});            
        //     setTimeout(() => {
        //         self.setState({visibleState : 2})
        //     }, 300);
        // }, 300);
    }

    reloadDiscounts()
    {
        let discounts = []

        for(let user_discount of UserManager.wallet.discounts)
        {
            for(let discount of DiscountsManager.discounts)
            {
                if(user_discount.meta.id == discount.id)
                {                              
                    user_discount.reference = discount          
                    discounts.push(user_discount);
                }
            }
        }

        this.setState({discounts: discounts});
    }

    refreshWallet()
    {
        this.reloadDiscounts()
        this.setState({refresh: !this.state.refresh});
        console.log('received wallet')
    }

    displayClaimDiscount(discount)
    {
        const {navigation} = this.props

        if(!discount) return
        navigation.navigate('discountsDetail',{discount: discount.reference, discount_id: discount.id,isConfirmationMode : true})
    }


    _renderDiscounts() {
        
        if(!this.state.discounts ||this.state.discounts.length == 0)
        {
            return <View style={{flex: 1,width: '100%', justifyContent:'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'avenir-medium', width:'60%', color: 'gray', fontSize: 26, textAlign: 'center'}}>
                    Browse discounts and add them to your wallet!
                </Text>
            </View>
        }

        return <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{height: 40}}>
                <Text style={{fontFamily: 'avenir-medium',color: themeLight, fontSize: 18}}>
                    {`${this.state.discounts.length}/4 Discounts Owned${this.state.discounts.length==4?' (FULL)':''}` }
                </Text>
            </View>
            <ScrollView style={{ width: '100%'}} contentContainerStyle={{ flex: 1, width: '100%' }}>
                <FlatList
                    data={this.state.discounts}
                    extraData={this.state.refresh}
                    renderItem={({ item }) => {
                        if (item.dummy) {
                            return (<View style={{ flex: 1, margin: 5, width: 100 }}></View>)
                        }
                        else {
                            const margin = 5
                            const discountItemWidth = windowWidth / 2 - margin * 3
                            const discountItemHeight = discountItemWidth * 1.2;
                            return (<DiscountItem discount={item.reference} height={discountItemHeight} width={discountItemWidth} onPress={() => { this.displayClaimDiscount(item) }} style={{ width: discountItemWidth, height: discountItemWidth * 1.2, margin: margin }} />)
                        }
                    }}
                    keyExtractor={(item) => item.reference.name}
                    numColumns={2}
                    key='discounts'
                // contentContainerStyle={style.discountContainer}
                >
                </FlatList>
            </ScrollView>
        </View>
        
    }

    _renderTicket(ticket)
    {
        const detailColor = 'lightgray';
        
        // return <View style={{width:50,height:50,backgroundColor:'white'}}></View>
        return <TouchableOpacity style={{
            backgroundColor: ticket.status == 'allocated' ? Colors.themeLight : 'gray', 
            height: itemHeight, 
            width: itemWidth, 
            marginLeft: itemMargin, 
            marginRight: itemMargin,
            borderRadius: 12
        }} onPress={()=>this.setState({selectedTicket : ticket})}>
            <View style={{flex:1}}>
                <Text style={{color:'white',fontFamily:'avenir-bold',fontSize:22,marginLeft: leftMargin,marginTop:12}}>
                    {`${ticket.event.name}`}
                </Text>
                
                <Text style={{color:'lightgray',fontFamily:'avenir-medium',fontSize:12,marginLeft: leftMargin, marginTop: 0}}>
                    {`by ${ticket.merchant.name}`}
                </Text>

                <View style={{flex: 1, marginRight: dottedLineMarginRight+10, justifyContent: 'center'}}>
                    <View style={{flex:1}}/>
                    <View style={{width: itemContentWidth, height: 15, marginLeft: leftMargin, marginTop: 2, marginBottom: 2, flexDirection: 'row',justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Image source={require('../../assets/Images/location.png')} style={{height:'100%',width: 20, resizeMode: 'contain', tintColor: detailColor}}/>
                        <Text numberOfLines={1} style={{color: detailColor,marginLeft: 5, height: 18, lineHeight: 18, flex: 1, fontSize: 13, fontFamily: 'avenir'}}>{ticket.event.location}</Text>
                    </View>                     
                    
                    <View style={{flex:1}}/>

                    <View style={{width: itemContentWidth, height: 33, marginLeft: leftMargin, marginBottom: 2, flexDirection: 'row',justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Image source={require('../../assets/Images/calendar.png')} style={{height: '100%',width: 20, resizeMode: 'contain', tintColor: detailColor}}/>
                        <Text numberOfLines={2} style={{color: detailColor,marginLeft: 6, lineHeight: 15, flex: 1, fontSize: 13, fontFamily: 'avenir'}}>{`${ticket.event.date} \n${ticket.event.time}`}</Text>
                    </View>
                    <View style={{flex:1}}/>
                </View>

                <Text style={{color:'white',fontFamily:'avenir-medium',fontSize:16,marginLeft: leftMargin, marginBottom: 12}}>
                    {`${ticket.meta.name} - $${ticket.meta.price/100}`}
                </Text>

                <View style={{backgroundColor: Colors.themeBackground, 
                    position:'absolute',
                    width: itemCutoutRadius*2, 
                    height: itemCutoutRadius*2, 
                    borderRadius: itemCutoutRadius,
                    top: itemHeight/2-itemCutoutRadius,
                    left: -itemCutoutRadius
                }}/>

                <View style={{backgroundColor: Colors.themeBackground, 
                    position:'absolute',
                    width: itemCutoutRadius*2, 
                    height: itemCutoutRadius*2, 
                    borderRadius: itemCutoutRadius,
                    top: itemHeight/2-itemCutoutRadius,
                    right: -itemCutoutRadius
                }}/>

                <Dash dashColor={Colors.themeBackground} dashLength={7} dashGap={7} dashThickness={1} style={{flexDirection: 'column',width: 0.5,height: itemHeight, position:'absolute',right: dottedLineMarginRight}}>

                </Dash>
            </View>
        </TouchableOpacity>
    }

    _renderTickets() {
        let tickets = UserManager.wallet.tickets;

        if(!tickets || tickets.length == 0)
        {
            return <View style={{flex: 1,width: '100%', justifyContent:'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'avenir-medium', width:'60%', color: 'gray', fontSize: 26, textAlign: 'center'}}>
                    Browse and purchase tickets and view them here later!
                </Text>
            </View>
        }

        return (            
            <FlatList data={tickets}
            extraData={this.state.refresh}
            renderItem={({item}) => {
                return this._renderTicket(item);
            }}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{margin: 6}}/>}
            key='tickets'>

            </FlatList>
        )
    }

    _renderTabButton(title, index)
    {
        return (<TouchableOpacity style={{flex: 1,justifyContent: 'center',alignItems: 'center', backgroundColor: this.state.selectedTabIndex==index?Colors.themeBackground:'white'}} onPress={()=>{
            this.reloadDiscounts();
            this.setState({selectedTabIndex : index})
        }}>
                <Text style={{fontFamily : 'avenir-medium', fontSize: 20, textAlign: 'center', color :this.state.selectedTabIndex==index?'white':Colors.themeBackground}}>
                    {title}
                </Text>
            </TouchableOpacity>)
    }


    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'black', flex: 1, alignItems:'center'}}>
                {/* <PaymentConfirmationModal visibleState={this.state.visibleState}/> */}
                <Modal isVisible={this.state.selectedTicket !== null} style={{flex:1,margin: 0}}>
                    <TicketDetail ticket={this.state.selectedTicket} dismiss={()=>{
                        this.setState({selectedTicket: null}
                    )}}/>
                </Modal>

                <View style={{flexDirection:'row', height: 40,width:'100%'}}>
                    {this._renderTabButton('Tickets',0)}
                    {this._renderTabButton('Discounts',1)}
                </View>
                <View style={{flex:1, backgroundColor:Colors.themeBackground, width: '100%', paddingTop: itemMargin}}>
                    {this.state.selectedTabIndex == 0 ? this._renderTickets() : this._renderDiscounts()}
                </View>                
            </SafeAreaView>
        )
    }
}

export default Wallet

const styles = StyleSheet.create({
    section: {
        width: '100%',
        backgroundColor: Colors.themeLight,
        height: 26,
        justifyContent: 'center'
    },
    sectionText: {
        marginLeft: 12,
        color: 'white',
        fontFamily: 'avenir-medium',
        fontSize: 16
    },
    menuOption: {
        marginTop: 2,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    menuOptionText: {
        marginLeft: 15,
        color: 'white',
        fontFamily: 'avenir-medium',
        fontSize: 18
    }
})