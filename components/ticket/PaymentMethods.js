import React,{Component} from 'react';
import {View, Text, SafeAreaView,TouchableOpacity} from 'react-native'
import Colors from '../../constants/Colors'
import { FlatList } from 'react-native-gesture-handler';
export default class PaymentMethods extends Component
{
    static navigationOptions = {
        headerStyle : {
            backgroundColor : 'black',
        },
        headerTintColor: Colors.themeLight,
        headerTitle: 'Payment Methods'        
    }

    constructor()
    {
        super()
        this._removePaymentMethod = this._removePaymentMethod.bind(this);
        this._addPaymentMethod = this._addPaymentMethod.bind(this);    
    }
    state = {
        paymentMethods : [
            {brand: 'VISA', lastFour : '4565'}
        ],
        refresh : true
    }

    _removePaymentMethod(index)
    {
        console.log(index)
    }
    
    _addPaymentMethod()
    {
        this.props.navigation.navigate('addPaymentMethod');
    }

    render()
    {        
        return <SafeAreaView style={{flex : 1, backgroundColor: Colors.themeBackground}}>
            <View style={{flex : 1,backgroundColor: Colors.themeBackground}}>
                <FlatList
                    data={this.state.paymentMethods}
                    extraData={this.state.refresh}
                    renderItem={({item,index}) => {                        
                        return (<View style={{flexDirection: 'row',width: '100%',height: 45, alignItems: 'center', backgroundColor: 'black'}}>
                            <Text style={{textAlign: 'center',color:'white',lineHeight: 45, flex:1, fontSize: 18, fontFamily: 'avenir-medium'}}>{item.brand} **** **** **** {item.lastFour}</Text>
                            <TouchableOpacity style={{marginRight: 4, width: 45,height:45}} onPress={()=>{
                                this._removePaymentMethod(index)
                            }}>
                                <Text style={{color:'white', lineHeight: 40,fontSize: 20, textAlign: 'center',}}>X</Text>
                            </TouchableOpacity>
                        </View>)
                    }}
                    keyExtractor={(item) => item.name}
                    numColumns = {2}
                    key='discounts'
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