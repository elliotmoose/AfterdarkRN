import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import Colors from '../../constants/Colors';
import QRCode from 'react-native-qrcode';

export default class TicketDetail extends Component
{

    state = {

    }

    componentDidMount()
    {
        setTimeout(() => {
            this._setQRPayload();
        }, 300);
    }

    async _setQRPayload()
    {
        let self = this;
        let ticket = this.props.ticket;
        
        if(!ticket || !ticket.id || !ticket.signature)
        {
            return
        }

        try 
        {
            let payload = JSON.stringify({
                ticket_id : ticket.id,
                signature : ticket.signature
            })

            self.setState({payload : payload});    
        } 
        catch (error) 
        {
            console.log(error)
            return 
        }
    }

    _renderRow(row)
    {
        return (                  
        <View style={styles.rowContainer}>
            <View style={styles.itemContainer}>
                <Text style={styles.textHeader}>{row[0].title}</Text>
                <Text style={styles.textContent}>{row[0].content}</Text>
            </View>                 
            <View style={styles.itemContainer}>
            <Text style={styles.textHeader}>{row[1].title}</Text>
                <Text style={styles.textContent}>{row[1].content}</Text>
            </View>                               
        </View>)
    }

    _renderQR()
    {
        let payload = this.state.payload ? this.state.payload : ''

        return (<View style={{justifyContent: 'center', width: 200, flex: 1}}>
            <View style={{justifyContent: 'center', width: 200, flex: 1}}>
                        <QRCode value={payload} size={200} bgColor='black' fgColor='white'/>
            </View>
            
            <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 54}}>
                <Text style={{textAlign: 'center'}}>
                    Scan your e-tickets at {"\n"}the entrance of the event
                </Text>
            </View>      
        </View>)
    }

    render()
    {
        let ticket = this.props.ticket;
        
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1, alignItems:'center'}}>
                {/* <PaymentConfirmationModal visibleState={this.state.visibleState}/> */}
                <View style={{ backgroundColor: 'white', height: 50, width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomColor: 'gray', borderBottomWidth: 0.5, flexDirection: 'row'}}>
                    
                    <TouchableOpacity style={{width: 50, height: '100%', justifyContent: 'center', marginLeft: 18}} onPress={this.props.dismiss}>
                        <Text style={{fontFamily: 'avenir-medium', fontSize: 18}}>
                            Done
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', fontFamily: 'avenir-medium', fontSize: 24, textAlign: 'center', flex: 1, marginRight: 15+50}}>
                        Ticket
                    </Text>
                </View>

                <View style={{width: '100%', alignItems: 'center', height: '35%'}}>
                    {this._renderRow([{title: 'Event', content: ticket ? ticket.event.name : ""},{title: 'Merchant', content: `${ticket ? ticket.merchant.name : ""}`},])}
                    {this._renderRow([{title: 'Date', content: ticket ? ticket.event.date : ""}, {title: 'Time', content: ticket ? ticket.event.time : ""},])}
                    {this._renderRow([{title: 'Ticket Type', content: ticket ? ticket.meta.name : ""},{title: 'Serial', content: `#${ticket ? ticket.id : ""}`},])}                                  
                </View>
                {this.state.payload ? this._renderQR() : <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator style={{width: 50, height: 50}}/>
                </View>}

                {/* <View style={{flexDirection:'row', height: 40,width:'100%'}}>
                    {this._renderTabButton('Tickets',0)}
                    {this._renderTabButton('Discounts',1)}
                </View>
                <View style={{flex:1, backgroundColor:Colors.themeBackground, width: '100%', paddingTop: itemMargin}}>
                    {this.state.selectedTabIndex == 0 ? this._renderTickets() : this._renderDiscounts()}
                </View>                 */}
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    rowContainer: {
        backgroundColor: Colors.themeBackground,
        flexDirection: 'row',
        justifyContent: 'center',
        // height: 80,
        flex: 1,
        width: '100%'
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textHeader : {
        color: 'gray'
    },
    textContent: {
        color: 'white'
    }
})