import {EventRegister} from 'react-native-event-listeners';
import React, { Component } from 'react';
import { View, Button, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Alert} from 'react-native';
import ActivityModal from '../reusable/ActivityModal';
import Colors from '../../constants/Colors';
import Picker from 'react-native-picker-select';
import UserManager from '../../managers/UserManager';
import PaymentsManager from '../../managers/PaymentsManager';
import TicketingManager from '../../managers/TicketingManager';
import PaymentConfirmationModal from '../payments/PaymentConfirmationModal';
import { NavigationAction } from 'react-navigation';


// 'pk_live_qhATGjhaSUCT3PYUefZEHb8w'


export default class Checkout extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: 'black',
        },
        headerTitle: 'Checkout',
        headerLeft: <TouchableOpacity style={{ marginLeft: 16 }} onPress={navigation.getParam('dismiss')}>
            <Text style={{ color: Colors.themeLight }}>
                Cancel
            </Text>
        </TouchableOpacity>
    });

    state = {
        paymentConfirmationState : 0,
        selectedTicket: 0,
        tickets : [
            // {name : 'Standard Ticket',price: 1000, tx_fee: 85 , id: 8,description: 'hello hlelo hellasdimroiwefwefwedew'}
        ]
    }

    constructor()
    {
        super()
        this._presentPaymentMethods = this._presentPaymentMethods.bind(this);
        this._navigateToTickets = this._navigateToTickets.bind(this);
    }

    _ticketPickerItems()
    {
        let output = [];

        for(let ticket of this.state.tickets)
        {
            let pickerItem = {
                label : ticket.count == 0 ? `${ticket.name} (Sold Out)` : ticket.name,
                key : ticket.id,
                value : ticket.name,
                color: ticket.count == 0 ? 'red' : 'black'
            }
            output.push(pickerItem);
        }

        if(this.state.tickets.length == 0)
        {
            return {label : "",key: "",name : ""}
        }

        return output;
    }

    _confirmPurchase = async () => {
        let ticket = this.state.tickets[this.state.selectedTicket];
        if(ticket !== undefined)
        {
            this.setState({paymentConfirmationState: 1}, async () => {
                let response = await TicketingManager.purchase(ticket);
                if(response.success === true)
                {
                    this.setState({paymentConfirmationState : 2}, ()=>{
                        // setTimeout(()=>{this.props.screenProps.dismiss();}, 200);                        
                    });
                }
                else
                {
                    Alert.alert('Error','The ticket could not be purchased at this time.', [
                        {
                            text:'Ok',
                            style:'default',
                            onPress: ()=>{this.setState({paymentConfirmationState : 0})}
                        }
                    ])                    
                }  
            })
            
        }
        else
        {
            console.log('Empty Ticket')
        }
    };

    componentWillMount() {

        if(this.props.screenProps !== undefined)
        {
            if(this.props.screenProps.dismiss !== undefined)
            {
                this.props.navigation.setParams({ dismiss: this.props.screenProps.dismiss });
            }
            else
            {
                console.log('Dismiss undefined')
            }

            if(this.props.screenProps.event !== undefined)
            {
                this.setState({tickets : this.props.screenProps.event.tickets})
            }
            else
            {
                console.log('No event passed by navigation')
            }
        }       
                
        this.listener = EventRegister.addEventListener('STRIPE_CUSTOMER_UPDATED',()=>{
            this.setState(this.state);//update ui
        })
    }

    componentWillUnmount()
    {
        EventRegister.removeEventListener(this.listener)
    }

    componentDidMount()
    {
        // this.setState({paymentConfirmationState: 2})
    }

    _navigateToTickets()
    {
        
        //this dismisses to event detail, where the prop is passed in
        let dismissToHomeNavigator = this.props.navigation.getParam('dismiss');

        //this pushes all the way to ticketing, timeout adds a delay to prevent the modal freezing screen issue
        this.setState({paymentConfirmationState: false},function() //dismiss payment confirmation modal to checkout
        {
            setTimeout(() => {
                dismissToHomeNavigator(); //dismiss checkout to event detail
                setTimeout(() => {
                    this.props.screenProps.navigateToTickets();//navigate to wallet
                }, 100);                        
            }, 100);        
        })            
    }

    _renderDefaultPaymentMethod()
    {
        let defaultPaymentMethod = PaymentsManager.defaultPaymentMethod();
        if(defaultPaymentMethod && defaultPaymentMethod.brand && defaultPaymentMethod.last4)
        {            
            return <Text style={{color: 'white', textAlign:'center', lineHeight : 45,flex: 1}}>
                {defaultPaymentMethod.brand.toUpperCase()} **** **** **** {defaultPaymentMethod.last4}
            </Text>
        }
        else
        {
            return <Text style={{color: 'white', textAlign:'center', lineHeight : 45,flex: 1}}>
                Add Payment Method
            </Text>
        }
    }

    _presentPaymentMethods()
    {        
        this.props.navigation.navigate('paymentMethods',{callback : ()=>{ 
            this.setState(this.state); 
        }});
    }

    render() {
        let self = this;
        let ticket = this.state.tickets[this.state.selectedTicket];
        const paymentPadding = 40

        let tx_fee_view;
        let ticket_name = ""
        let ticket_description = ""
        let ticket_price = 0; 
        let ticket_tx_fee = 0;
        let soldOut = ticket.count == 0

        if(ticket != undefined)
        {
            console.log(ticket)
            if(ticket.price !== undefined)
            {
                ticket_price = ticket.price;
            }

            if(ticket.tx_fee !== undefined)
            {
                ticket_tx_fee = ticket.tx_fee;
            }

            if(ticket.name !== undefined)
            {
                ticket_name = ticket.name
            }

            if(ticket.description !== undefined)
            {
                ticket_description = ticket.description
            }
        }
        
        if(ticket_tx_fee != 0)
        {
            tx_fee_view = (<View style={{height:30, width: '100%',flexDirection:'row', paddingLeft: paymentPadding, paddingRight: paymentPadding, alignItems: 'center'}}>
                <Text style={styles.labelTitle}>Transaction Fee:</Text>
                <View style={{flex: 1}}></View>
                <Text style={styles.labelValue}>${ticket_tx_fee/100}</Text>
            </View>)
        }


        return (
            <SafeAreaView style={{ flex: 1 ,backgroundColor : Colors.themeBackground}}>
            <PaymentConfirmationModal visibleState={this.state.paymentConfirmationState} dismiss={this._navigateToTickets}/>
                <View style={styles.container}>
                    <View style={{ width: '70%', height: 40, flexDirection: 'row', marginTop: 24 }}>
                        <Text style={{ flex: 1, color: 'white', lineHeight: 40 }}>
                            Ticket:
                        </Text>
                        <View style={{ flex: 3 }}>
                            <Picker style={{ ...pickerStyle }} placeholder={{}} value={ticket_name} items={this._ticketPickerItems()} onValueChange={(value, index) => {                                 
                                this.setState({ selectedTicket: index})                                                            
                            }}></Picker>
                        </View>
                    </View>                    
                    
                    {soldOut ? <View style={{height: 24}}/> : <View style={{marginTop: 8, height: 50, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontFamily: 'avenir-medium', color: 'gray', fontSize: 18}}>{`Tickets left: ${ticket.count}`}</Text>
                    </View>}

                    <View style={{flex : 1,width: '100%', alignItems: 'center'}}>
                        <View style={{margin: 24, marginTop: 0, flex : 1}}>
                            <ScrollView>
                                <Text style={{color: 'white', fontSize: 14}}>
                                    {ticket_description}
                                </Text>
                            </ScrollView>                        
                        </View>
                        {soldOut ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                            <Text style={{fontFamily: 'avenir-bold', fontSize: 40, color: Colors.red, textAlign: 'center'}}>
                                SOLD OUT
                            </Text>
                        </View> 
                        : 
                        <View style={{width: '100%', justifyContent: 'flex-end'}}>                            
                            <View style={{marginBottom : 5, paddingLeft: 18, width: '100%', height: 30, borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
                                <Text style={{fontFamily: 'avenir-bold',fontSize: 20,width: '100%', color: 'white'}}>
                                    Payment:
                                </Text>
                            </View>

                            <View style={{height:30, width: '100%',flexDirection:'row', paddingLeft: paymentPadding, paddingRight: paymentPadding, alignItems: 'center'}}>
                                <Text style={styles.labelTitle}>Ticket:</Text>
                                <View style={{flex: 1}}></View>
                                <Text style={styles.labelValue}>${ticket_price/100}</Text>
                            </View>
                            
                            {tx_fee_view}                        

                            <View style={{height:40, width: '100%',flexDirection:'row', borderTopColor:'white', borderTopWidth: 1, borderBottomColor:'white', borderBottomWidth: 1, paddingLeft: paymentPadding, paddingRight: paymentPadding, marginTop: 5}}>
                                <Text style={{color:'white',fontSize: 19, flex: 1, height: 40, lineHeight: 40}}>Total:</Text>
                                <View style={{flex: 1}}></View>
                                <Text style={{textAlign:'right', color:'white',fontSize: 19 , flex: 1, height: 40, lineHeight: 40}}>${(ticket_price+ticket_tx_fee)/100}</Text>
                            </View>
                        </View>}
                    </View>

                    {soldOut ? null
                        :
                        <TouchableOpacity style={{ width: '100%', height: 45, marginTop: 24, marginBottom: 0, backgroundColor: '#3a3a3a' }} onPress={this._presentPaymentMethods}>
                            {this._renderDefaultPaymentMethod()}
                        </TouchableOpacity>
                    }
                    {soldOut ? null
                        :
                        <TouchableOpacity onPress={this._confirmPurchase} style={{ width: '100%', height: 45, backgroundColor: Colors.themeLight, marginBottom: 50 }} >
                            <Text style={{ fontFamily: 'avernier-bold', fontSize: 20, lineHeight: 45, textAlign: 'center', color: 'white', flex: 1 }}>
                                Confirm Purchase
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </SafeAreaView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor : Colors.themeBackground
        // justifyContent: 'center',
    },
    labelTitle : {
        fontSize: 13,
        color:'white',
        flex: 2
    },
    labelValue : {
        fontSize: 13,
        textAlign:'right', 
        color:'white', 
        flex: 1
    }
};


const pickerStyle = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
    inputAndroid: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        
    },
    inputIOSContainer : {
        padding : 0,
    }
})