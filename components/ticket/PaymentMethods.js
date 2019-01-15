import React,{Component} from 'react';
import {Alert, View, Text, SafeAreaView,TouchableOpacity, ActivityIndicator,Image} from 'react-native'
import Colors from '../../constants/Colors'
import { FlatList } from 'react-native-gesture-handler';
import UserManager from '../../managers/UserManager'
import PaymentsManager from '../../managers/PaymentsManager'
import ActivityModal from '../reusable/ActivityModal';
import Modal from 'react-native-modal';

export default class PaymentMethods extends Component
{
    static navigationOptions = ({navigation})=>{
        
        const {state} = navigation
        return {
        headerStyle : {
            backgroundColor : 'black',
        },
        headerTintColor: Colors.themeLight,
        headerTitle: 'Payment Methods',
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

    constructor()
    {
        super()
        this._removePaymentMethod = this._removePaymentMethod.bind(this);
        this._addPaymentMethod = this._addPaymentMethod.bind(this);    
        this._refresh = this._refresh.bind(this);
    }
    state = {
        refresh : true,
        isAwaitingResponse : false
    }



    componentWillMount()
    {
        this._loadPaymentMethods = this._loadPaymentMethods.bind(this);
        this._loadPaymentMethods();
        this.props.navigation.setParams({refresh: this._loadPaymentMethods});
    }

    async _loadPaymentMethods()
    {
        this.props.navigation.setParams({isLoading: true})
        try 
        {
            let response = await UserManager.loadStripeUser();

            this.setState({refresh: !this.state.refresh},function(){
                this.props.navigation.setParams({isLoading: false})
            });
        }
        catch(error)
        {
            console.log(error);
            this.props.navigation.setParams({isLoading: false})
            Alert.alert('Error','Payment methods could not be loaded at this time... Please check your internet connection');          
        }    
    }
 
    _refresh()
    {
        this.setState({refresh : !this.state.refresh});
    }
    _addPaymentMethod()
    {
        this.props.navigation.navigate('addPaymentMethod',{callback : this._refresh});
    }

    async _removePaymentMethod(index)
    {
        let paymentMethods = PaymentsManager.paymentMethods();
        if (paymentMethods[index] && paymentMethods[index].id)
        {
            let card_id = paymentMethods[index].id;
            try 
            {
                this.setState({isAwaitingResponse: true},async ()=> {
                    let response = await PaymentsManager.removePaymentMethod(card_id);
                                        
                    if(response.success === true)
                    {
                        this.setState({refresh: !this.state.refresh,isAwaitingResponse: false});
                    }
                    else
                    {
                        throw response.output;
                    }
                })                
            }
            catch (error)
            {
                console.log(error);
                Alert.alert("Error", 'Payment method could not be removed at this time... Please check your internet connection', [{ text: "Ok", onPress: () => { this.setState({isAwaitingResponse : false}) }}]);
            }
            
        }
    }

    render()
    {        
        if(PaymentsManager.paymentMethods().length == 0 && this.props.navigation.getParam('isLoading') == false)
        {
            return <SafeAreaView style={{flex : 1, backgroundColor: Colors.themeBackground}}>
                <ActivityModal isVisible={this.state.isAwaitingResponse} />
                <View style={{flex : 1,backgroundColor: Colors.themeBackground}}>                
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{width: '70%', color : 'gray', fontFamily : 'avenir-bold',fontSize: 32, textAlign: 'center'}}>
                    NO PAYMENT METHODS YET
                </Text>
                </View>                

                <TouchableOpacity style={{backgroundColor: Colors.themeLight,width: '100%',height: 45, marginBottom: 50}} onPress={this._addPaymentMethod}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: 20, lineHeight: 45,flex: 1}}>Add Payment Method</Text>
                </TouchableOpacity>
                </View>                
            </SafeAreaView>
        }
        else
        {
            'non null'
        }

        return <SafeAreaView style={{flex : 1, backgroundColor: Colors.themeBackground}}>
            <ActivityModal isVisible={this.state.isAwaitingResponse} />
            <View style={{flex : 1,backgroundColor: Colors.themeBackground}}>
                <FlatList
                    data={PaymentsManager.paymentMethods()}
                    extraData={this.state.refresh}
                    renderItem={({item,index}) => {                        
                        return (<View style={{flexDirection: 'row',width: '100%',height: 45, alignItems: 'center', backgroundColor: 'black'}}>
                            <Text style={{textAlign: 'center',color:'white',lineHeight: 45, flex:1, fontSize: 18, fontFamily: 'avenir-medium'}}>{item.brand} **** **** **** {item.last4}</Text>
                            <TouchableOpacity style={{marginRight: 4, width: 45,height:45}} onPress={()=>{
                                this._removePaymentMethod(index)
                            }}>
                                <Text style={{color:'white', lineHeight: 40,fontSize: 20, textAlign: 'center',}}>X</Text>
                            </TouchableOpacity>
                        </View>)
                    }}
                    keyExtractor={(item) => item.id}
                    key='paymentMethods'
                    contentContainerStyle={{flex : 1}}
                    >
                </FlatList>
            </View>
            <TouchableOpacity style={{backgroundColor: Colors.themeLight,width: '100%',height: 45, marginBottom: 50}} onPress={this._addPaymentMethod}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 20, lineHeight: 45,flex: 1}}>Add Payment Method</Text>
            </TouchableOpacity>
        </SafeAreaView>
    }
}