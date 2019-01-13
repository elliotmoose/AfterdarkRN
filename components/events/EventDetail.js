import React, {Component} from 'react';
import {Dimensions,Text,ImageBackground,TouchableOpacity,View, StyleSheet, Alert} from 'react-native';
import Colors from '../../constants/Colors';
import Images from '../../managers/ImagesManager';
import EventItem from './EventItem';
import MerchantsManager from '../../managers/MerchantsManager'
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'
import Checkout from '../ticket/Checkout';
import AddPaymentMethod from '../ticket/AddPaymentMethod';
import PaymentNavigator from '../navigators/PaymentNavigator'
const windowWidth = Dimensions.get('window').width
export default class EventDetail extends Component
{
    state = {
        showModal : false
    }
    componentWillMount()
    {
        
    }

    render()
    {
        const {navigation} = this.props
        const event = navigation.getParam('event')  

        const margin = 5
        const eventItemwidth = windowWidth-margin*2
        
        return <View style={styles.container}>

            <Modal isVisible={this.state.showModal} style={{backgroundColor:'white', flex : 1,margin:0}} >            
                <PaymentNavigator screenProps={{event: event,dismiss : ()=>{this.setState({showModal : false})}}}/>
                {/* <Checkout style={{flex: 1}} dismiss={()=>{this.setState({showModal : false})}}></Checkout> */}
            </Modal>             

            <View style={{width:eventItemwidth, height: eventItemwidth*0.5}}>
                <EventItem onPress={()=>{}} event={event}/>                
            </View>            

            <View style={styles.about}>
                <Text style={{color : 'white', lineHeight : 30, flex : 1, fontFamily : 'avernir-medium', fontSize: 20,}}>
                    About
                </Text>
            </View>            
            
            <ScrollView style={{marginTop : 8, marginBottom : 12, width : '85%', alignItems: 'center'}}>
                <Text style={{color: 'white', flex : 1}}>
                    {event.description}
                </Text>
            </ScrollView>      

            <TouchableOpacity style={{width:'80%',height:45,backgroundColor:Colors.themeLight, marginBottom : 36, borderRadius: 8}} onPress={()=>{
                
                if(event !== undefined && event.tickets.length != 0)
                {
                    this.setState({showModal: true})                
                }
                else
                {
                    Alert.alert('Hmm...','This event has no available tickets')
                }                
                }}>
                <Text style={{color:'white',textAlign:'center',fontFamily : 'avenir-medium' , fontSize: 20, lineHeight: 45}}>
                    GET TICKETS
                </Text>    
            </TouchableOpacity>      
        </View>
    }
}

const styles = StyleSheet.create({
    container : {
        height:'100%',
        width:'100%',
        alignItems: 'center',
        backgroundColor: Colors.themeBackground
    },
    about : {        
        width : '85%',
        height : 34,
        marginTop : 14,
        paddingLeft : 4,
        paddingRight : 4,
        paddingBottom : 4,
        borderBottomColor : 'white',
        borderBottomWidth : 1,
        borderBottomStart : 40
    },
    location : {
        marginTop : 0,
        marginBottom : 12,
        width : '70%',
        height : 40,
        alignItems : 'center'
    },
    locationText : {
        color : 'white',
        textAlign : 'center'
    }
})