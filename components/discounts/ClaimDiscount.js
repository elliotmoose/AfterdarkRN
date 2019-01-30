import React, {Component} from 'react';
import {View, SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Dimensions} from 'react-native'

import {Header} from 'react-navigation'
import Colors from '../../constants/Colors'
import DiscountsManager from '../../managers/DiscountsManager'
import ActivityModal from '../reusable/ActivityModal';

const windowWidth = Dimensions.get('screen').width;
export default class ClaimDiscount extends Component
{
    state = {
        code : '',
        isLoading: false
    }

    constructor()
    {
        super();
        this._claimDiscount = this._claimDiscount.bind(this);
    }

    _claimDiscount()
    {
        const {navigation} = this.props
        const discount_id = navigation.getParam('discount_id');
        const {code} = this.state;

        this.setState({isLoading: true},async ()=>{
            try {
                if(!discount_id)
                {
                    throw 'no discount id'
                }

                if(code.length != 4)
                {
                    throw {message: 'Code not entered. Please enter Merchant\'s 4 digit code'}
                }
                
                let response = await DiscountsManager.claimDiscount(discount_id, code)    
                
                if(response.error)
                {
                    console.log(response)
                    throw response.error
                }

                Alert.alert('Verified!', 'This discount has been verified!',[{
                    text: 'Ok',
                    onPress: ()=>{
                        this.setState({isLoading: false}, function(){
                            setTimeout(() => {
                                navigation.navigate('root');
                            }, 300);
                        })
                    }
                }])                

            } catch (error) {        
                console.log(error)        
                if (error.message) 
                {
                    if(error.statusText)
                    {
                        Alert.alert(error.statusText, error.message,[{
                            text: 'Ok',
                            onPress: ()=>{
                                this.setState({isLoading: false})
                            }
                        }])
                    }
                    else
                    {
                        console.log(error)
                        console.log(error.message)
                        Alert.alert('Error1', error.message,[{
                            text: 'Ok',
                            onPress: ()=>{
                                this.setState({isLoading: false})
                            }
                        }])
                    }
                }
                else
                {
                    Alert.alert('Error', 'The discount could not be verified at this time',[{
                        text: 'Ok',
                        onPress: ()=>{
                            this.setState({isLoading: false})
                        }
                    }])
                }                
            } 
        })
    }

    componentDidMount()
    {
        if(this.textinput)
        {
            this.textinput.focus();
        }
    }

    render()
    {
        
        return <SafeAreaView style={{ flex: 1 }}>
            <ActivityModal isVisible={this.state.isLoading}/>            
            <View style={{ flex: 1, backgroundColor: Colors.themeBackground, alignItems: 'center'}}>
                <View style={{height: 60, width:'70%', alignItems:'center', justifyContent:'center', marginTop: 32}}>
                    <Text numberOfLines={2} style={{flex: 1, fontFamily: 'avenir',color: 'gray', fontSize: 20, textAlign: 'center', lineHeight: 25}}>
                        To claim discount, let the staff enter their passcode
                    </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '70%', height: 60}}>
                    <Text style={styles.pinText}>
                        {this.state.code.length > 0 ? '•' : '-'}
                    </Text>
                    <Text style={styles.pinText}>
                        {this.state.code.length > 1 ? '•' : '-'}
                    </Text>
                    <Text style={styles.pinText}>
                        {this.state.code.length > 2 ? '•' : '-'}
                    </Text>
                    <Text style={styles.pinText}>
                        {this.state.code.length > 3 ? '•' : '-'}
                    </Text>
                </View>
                <View style={{flex:1}}>

                </View>
                
                <KeyboardAvoidingView style={{width: '100%', height: 45, alignItems:'center', marginBottom: 32}} keyboardVerticalOffset={Header.HEIGHT+45} behavior='position'>
                    <TouchableOpacity style={{width:Math.min(0.8*windowWidth, 300),height:45,backgroundColor:Colors.themeLight, borderRadius: 12}} onPress={()=>{
                        this._claimDiscount();
                    }}>
                        <Text style={{color:'white',textAlign:'center',fontFamily : 'avenir-medium' , fontSize: 20, lineHeight: 45}}>
                            CLAIM NOW
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                

                <TextInput
                    ref={input => (this.textinput = input)}
                    style={{ display: 'none' }}
                    keyboardType='numeric'
                    onChangeText={text=>{
                        if(text.length <= 4)
                        {
                            this.setState({code: text})
                        }                        
                    }}
                    value={this.state.code}
                />
            </View>
        </SafeAreaView>
    }
}

const styles= StyleSheet.create({
    pinText: {
        color: Colors.themeLight,
        fontSize: 70,
        textAlign: 'center',
        width: '20%',
        height: '100%'
    }
})