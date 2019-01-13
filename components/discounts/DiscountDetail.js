import React, {Component} from 'react';
import {Dimensions,Text,ImageBackground,TouchableOpacity,View, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Images from '../../managers/ImagesManager';
import DiscountItem from './DiscountItem';
import MerchantsManager from '../../managers/MerchantsManager'
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'
import Checkout from '../ticket/Checkout';
import AddPaymentMethod from '../ticket/AddPaymentMethod';

const windowWidth = Dimensions.get('window').width
export default class DiscountDetail extends Component
{
    // static navigationOptions = {        
    //     header: null,
    // }

    state = {
        showModal : false
    }
    componentWillMount()
    {
        
    }
    render()
    {
        const {navigation} = this.props
        const discount = navigation.getParam('discount')  

        const margin = 5
        const discountItemwidth = windowWidth/2-margin*3
        
        return <View style={styles.container}>

            <Modal isVisible={this.state.showModal} style={{backgroundColor:'white', margin:0}}>            
                <Checkout style={{flex: 1}} dismiss={()=>{this.setState({showModal : false})}}></Checkout>
            </Modal>             

            <View style={{marginTop: 12, marginBottom : 12, width : discountItemwidth,height: discountItemwidth*1.2}}>
                <DiscountItem onPress={()=>{}} discount={discount}/>                
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

            <TouchableOpacity style={{width:'80%',height:45,backgroundColor:Colors.themeLight, marginBottom : 36, borderRadius: 8}} onPress={()=>{this.setState({showModal: true})}}>
                <Text style={{color:'white',textAlign:'center',fontFamily : 'avenir-medium' , fontSize: 20, lineHeight: 45}}>
                    ADD TO WALLET
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