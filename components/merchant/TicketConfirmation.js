import React, {Component} from 'react';
import {SafeAreaView, View, ActivityIndicator, Image, Text, Alert, TouchableOpacity} from 'react-native';
import bcrypt from 'react-native-bcrypt';
import TicketingManager from '../../managers/TicketingManager'
import Colors from '../../constants/Colors';

export default class TicketConfirmation extends Component
{
    state = {
        isLoading: true, 
        ticket_validity_status: 'FAILED',
        header : '',
        body : '',
    }

    componentWillMount()
    {
        
    }

    handler(status, statusText, message)
    {
        this.setState({ticket_validity_status: status})
        switch(status)
        {
            case 'NO_INTERNET':
                Alert.alert('Error',message);
                this.setState({
                    header: 'CONNECTION FAILED',
                    body: 'The connection to the server could not be established'
                })
                break
            case 'VERIFIED':
                this.setState({
                    header: 'VERIFIED',
                    body: 'This ticket is verified'
                })
                break
            case 'RE_ENTRY':
                this.setState({
                    header: 'RE-ENTRY',
                    body: 'The ticket has been verified. \n The ticket has been scanned before.'
                })
                break
            
            default:
                if(status && statusText && message)
                {
                    this.setState({
                        ticket_validity_status: status,
                        header: statusText,
                        body: message
                    })
                }
                else
                {
                    this.setState({
                        header: 'FAILED',
                        body: `Unknown Error: ${status}. \n Contact Support for Help. \n Error message: ${message}`
                    })
                }                
                break
        }
    }

    async componentDidMount()
    {
        let payload = this.props.payload;

        try 
        {
            let response = await TicketingManager.verifyTicketPayload(payload);
            this.setState({isLoading: false});
            this.handler(response.status)
        }
        catch (error)
        {
            console.log(error)
            this.setState({isLoading: false});

            if(error.status && error.message && error.statusText)
            {
                this.handler(error.status, error.statusText, error.message)
            }
            else
            {
                this.handler('UNKNOWN',error)
            }            
        }
        // this.props.dismiss();
    }

    _renderLoading()
    {
        return (<View style={{flex: 1,justifyContent:'center', alignItems: 'center'}}>
            <ActivityIndicator style={{width: 50,height: 50}}/>
        </View>)
    }

    _renderImage()
    {
        if(this.state.ticket_validity_status != 'RE_ENTRY' && this.state.ticket_validity_status != 'VERIFIED')
        {
            return <Image source={require('../../assets/Images/cross_circle_outline.png')} resizeMode='contain' style={{flex:1,tintColor: Colors.red}}/>
        }
        else
        {
            return <Image source={require('../../assets/Images/tick_circle_outline.png')} resizeMode='contain' style={{flex:1,tintColor: this.state.ticket_validity_status=='RE_ENTRY' ? Colors.orange : Colors.green}}/>
        }
    }

    _renderConfirmation()
    {
        return (<View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
            <View style={{height: '40%', width: '100%', marginTop: '20%', alignItems:'center', justifyContent:'center'}}>
                {this._renderImage()}
            </View>
            <Text style={{fontFamily: 'avenir-bold',fontSize: 40, color: this.state.ticket_validity_status == 'VERIFIED' ? Colors.green : this.state.ticket_validity_status == 'RE_ENTRY' ? Colors.orange : Colors.red,textAlign:'center'}}>{this.state.header.toUpperCase()}</Text>
            <Text style={{textAlign:'center'}}>{this.state.body}</Text>
            <View style={{flex:1}}></View>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', marginBottom: 42, height: 50, backgroundColor: Colors.green, borderRadius: 12, width: '80%'}} onPress={this.props.dismiss}>
                <Text style={{fontFamily: 'avenir', fontSize: 20, color: 'white'}}>Back to Scanning</Text>
            </TouchableOpacity>
        </View>)
    }


    render()
    {
        return (<SafeAreaView style={{flex:1}}>
            <View style={{flex: 1}}>
                {this.state.isLoading ? this._renderLoading() : this._renderConfirmation()}
            </View>
        </SafeAreaView>)
    }
}