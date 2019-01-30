import React,{Component} from 'react';
import {TouchableOpacity, View, Image, Text, ActivityIndicator, Animated, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';

const screenHeight = Dimensions.get('window').height;
const confirmationHeight = screenHeight/2.3;
export default class PaymentConfirmationModal extends Component
{
    _renderConfirmation()
    {
        return (<Animated.View style={{backgroundColor:'white', height: confirmationHeight, width: '100%', marginBottom: this.state.slideAnim, alignItems:'center'}}>
            <Image source={require('../../assets/Images/tick_circle_outline.png')} style={{tintColor: Colors.green,marginTop: 16,flex: 1,width: '100%',resizeMode: 'contain'}}/>
            <View style={{flex: 1,alignItems: 'center', marginTop: 20, marginBottom: 0}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'avenir-medium', fontSize: 26}}>
                        YOU'VE RECEIVED YOUR TICKETS
                    </Text>
                </View>
                <Text style={{flex: 1, fontFamily: 'avenir',color:'gray', fontSize: 20}}>
                    Thank you for your purchase!
                </Text>
            </View>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width: '80%', maxHeight: 45, minHeight: 35, height: '15%', backgroundColor: Colors.green, borderRadius: 12, marginBottom: 30}} onPress={this.props.dismiss}>
                <Text style={{fontFamily: 'avenir-medium', fontSize: 24, color: 'white', textAlign:'center'}}>
                    View Tickets
                </Text>
            </TouchableOpacity>
        </Animated.View>)
    }

    _renderActivityIndicator()
    {
        return (<ActivityIndicator style={{width : 40,height:40, flex: 1}}/>)
    }

    state = {
        confirmationTriggered : false,
        slideAnim : new Animated.Value(-confirmationHeight)
    }
    
    render()
    {
        if(this.state.confirmationTriggered === false && this.props.visibleState == 2)
        {
            this.setState({confirmationTriggered: true}, function(){
                Animated.timing(                  // Animate over time
                    this.state.slideAnim,            // The animated value to drive
                    {
                      toValue: 0,
                      duration: 300,              // Make it take a while
                    }
                ).start();   
            })
        }

        // if(this.props.visibleState == 2)
        // {
        //     console.log('new')
        // }
        return (
            <Modal isVisible={this.props.visibleState == 0 ? false : true } style={{alignItems: 'center', justifyContent: 'flex-end', margin: 0,flex: 1}}>
                {this.props.visibleState == 1 ? this._renderActivityIndicator() : null}
                {this.props.visibleState == 2 ? this._renderConfirmation() : null}
            </Modal>
        )
    }
}