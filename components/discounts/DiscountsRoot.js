// Home.js
import {EventRegister} from 'react-native-event-listeners';
import React, { Component } from 'react';
import { Image, View, Text, Button, ScrollView, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import DiscountItem from './DiscountItem';
import DiscountsManager from '../../managers/DiscountsManager';

const windowWidth = Dimensions.get('window').width

export class DiscountsRoot extends Component {

	
    static navigationOptions = ({navigation})=>{
        
        const {state} = navigation
        return {
        headerStyle : {
            backgroundColor : 'black',
        },
        headerTintColor: Colors.themeLight,
        headerTitle: 'Discounts',
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
	state = {
		discounts : []
	}

	constructor()
	{
		super();
		this.displayDetailViewWithDiscount = this.displayDetailViewWithDiscount.bind(this);
	}

	componentWillMount()
	{
		//subscribe to discount load event
		this.discountListener = EventRegister.addEventListener('DISCOUNTS_LOADED', (discounts) => {            
			this.setState({discounts : discounts})
			this.props.navigation.setParams({isLoading: false})
		})

		    
        this.props.navigation.setParams({refresh: ()=>{
            DiscountsManager.GetDiscounts();
            this.props.navigation.setParams({isLoading: true})
        }, isLoading: false})
	}

	componentWillUnmount()
	{
		EventRegister.removeEventListener(this.discountListener);
	}

	componentDidMount()
	{
		let discounts = DiscountsManager.discounts;		
		this.setState({discounts: discounts});
	}

	displayDetailViewWithDiscount(discount)
    {
        this.props.navigation.navigate('discountsDetail',{discount: discount})        
    }

	render() {
		if(!this.state.discounts || this.state.discounts.length == 0)
        {
            return <View style={{flex: 1,width: '100%', justifyContent:'center', alignItems: 'center', backgroundColor: Colors.themeBackground}}>
            <Text style={{fontFamily: 'avenir-medium', width:'60%', color: 'gray', fontSize: 26, textAlign: 'center'}}>
                Connection Error. Please check your connection and refresh!
            </Text>
        </View>
        }

		return (
			<View style={{ backgroundColor: Colors.themeBackground, flex: 1 }}>
				<ScrollView style={{ width: '100%', margin: 10 }} contentContainerStyle={{ flex: 1, width: '100%' }}>
					<FlatList
						data={this.state.discounts}
						extraData={this.state.refresh}
						renderItem={({ item }) => {
							if (item.dummy) {
								return (<View style={{ flex: 1, margin: 5, width: 100 }}></View>)
							}
							else {
								const margin = 5
								const discountItemWidth = windowWidth / 2 - margin * 3
								const discountItemHeight = discountItemWidth * 1.2;
								return (<DiscountItem discount={item} height={discountItemHeight} width={discountItemWidth} onPress={() => { this.displayDetailViewWithDiscount(item) }} style={{ width: discountItemWidth, height: discountItemWidth * 1.2, margin: margin }} />)
							}
						}}
						keyExtractor={(item) => item.name}
						numColumns={2}
						key='discounts'
					// contentContainerStyle={style.discountContainer}
					>
					</FlatList>
				</ScrollView>
			</View>
		)
	}
}

export default DiscountsRoot