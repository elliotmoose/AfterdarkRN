import React, {Component} from 'react';
import {Dimensions,Text,ImageBackground,TouchableOpacity,View, StyleSheet, Alert} from 'react-native';
import Colors from '../../constants/Colors';
import Images from '../../managers/ImagesManager';
import DiscountItem from './DiscountItem';
import MerchantsManager from '../../managers/MerchantsManager'
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'
import Checkout from '../payments/Checkout';
import AddPaymentMethod from '../payments/AddPaymentMethod';
import DiscountsManager from '../../managers/DiscountsManager';
import ActivityModal from '../../components/reusable/ActivityModal'

const windowWidth = Dimensions.get('window').width
export default class DiscountDetail extends Component
{
    // static navigationOptions = {        
    //     header: null,
    // }

    _showClaimDiscount()
    {
        const {navigation} = this.props
        const discount_id = navigation.getParam('discount_id')          
        navigation.navigate('claimDiscount',{discount_id: discount_id});

    }

    _addDiscountToWallet()
    {
        
        const {navigation} = this.props
        const discount = navigation.getParam('discount')  
        
        this.setState({isLoading: true},async ()=>{
            try {
                if(!discount || !discount.id)
                {
                    throw 'no discount'
                }
                
                let response = await DiscountsManager.addToWallet(discount.id);    
                
                if(response.error)
                {
                    throw response.error
                }

                Alert.alert('Done!', 'The discount has been added to your wallet',[{
                    text: 'Ok',
                    onPress: ()=>{
                        if(discount && discount.count)
                        {
                            discount.count -= 1; 
                        }
                        
                        this.setState({isLoading: false})
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
                        Alert.alert('Error', error.message,[{
                            text: 'Ok',
                            onPress: ()=>{
                                this.setState({isLoading: false})
                            }
                        }])
                    }
                }
                else
                {
                    Alert.alert('Error', 'The discount could not be added at this time',[{
                        text: 'Ok',
                        onPress: ()=>{
                            this.setState({isLoading: false})
                        }
                    }])
                }                
            } 
        })
    }

    state = {
        isLoading : false
    }

    constructor()
    {
        super();
        this._addDiscountToWallet = this._addDiscountToWallet.bind(this);
    }
    componentWillMount()
    {
        
    }
    render()
    {
        const {navigation} = this.props
        const isConfirmationMode = navigation.getParam('isConfirmationMode') ? navigation.getParam('isConfirmationMode') : false
        const discount = navigation.getParam('discount')  

        const margin = 5
        const discountItemwidth = windowWidth/2-margin*3
        
        return <View style={styles.container}>
            <ActivityModal isVisible={this.state.isLoading}/>
            <View style={{marginTop: 12, marginBottom : 12, width : discountItemwidth,height: discountItemwidth*1.2}}>
                <DiscountItem onPress={()=>{}} discount={discount} style={{flex: 1}}/>                
            </View>            

            <TouchableOpacity style={styles.location}>
                <Text style={styles.locationText}>
                    {MerchantsManager.merchantWithID(discount.merchant_id).address_full}
                </Text>
            </TouchableOpacity>
            
            <ScrollView style={{marginTop : 12, marginBottom : 12, width : '75%', alignItems: 'center'}}>
                <Text style={{color: 'white', flex : 1}}>
                    {discount.description}
                </Text>
            </ScrollView>      

            <TouchableOpacity style={{width:'80%',height:45,backgroundColor:Colors.themeLight, marginBottom : 36, borderRadius: 8}} onPress={()=>{
                isConfirmationMode ? this._showClaimDiscount() : this._addDiscountToWallet();
            }}>
                <Text style={{color:'white',textAlign:'center',fontFamily : 'avenir-medium' , fontSize: 20, lineHeight: 45}}>
                    {isConfirmationMode ? 'CLAIM NOW' : 'ADD TO WALLET'}
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
        backgroundColor:'#191919'
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