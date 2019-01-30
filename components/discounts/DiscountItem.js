import React, {Component} from 'react';
import {Dimensions,Text,ImageBackground, Image, TouchableOpacity,View, StyleSheet} from 'react-native';
import Colors, { black } from '../../constants/Colors';
import Images from '../../managers/ImagesManager';

export default class DiscountItem extends Component
{
    constructor(props)
    {
        super(props)        
    }

    render()
    {        
        return <View style={[this.props.style,styles.container]}>
            <TouchableOpacity style={{flex: 1}} onPress={this.props.onPress}>
                <View style={{width: '100%', height:'100%',position:'absolute'}}>
                    <Image style={{width: '100%',height: '100%', opacity: 0.4}} source={this.props.discount.image}/>
                </View>
                <View style={{width: '100%', height:'100%',position:'absolute'}}>
                    <Text style={styles.discountAvailability}>
                        {this.props.discount.count}/{this.props.discount.total}
                    </Text>
                    <Text style={styles.discountPrice}>
                        {this.props.discount.amount}
                    </Text>
                    <Text style={styles.discountDescription}>
                        {this.props.discount.name}
                    </Text>
                    <Text style={styles.discountClaim}>
                        CLAIM >
                    </Text>

                    <View style={this.props.discount.count==0? styles.redeemed : {opacity : 0}}>
                        <Text adjustsFontSizeToFit minimumFontScale={0.5} style={styles.redeemedLabel}>
                            FULLY REDEEMED
                        </Text>
                    </View>    
                </View>
            {/* <View style={{position:'absolute', width: '100%', height:'100%'}}>

            </View>
                 */}

                {/* <ImageBackground style={styles.discountImage} source={this.props.discount.image}>
                    <View style={styles.blackTint}>
                        
                    </View>
                </ImageBackground> */}
            </TouchableOpacity>
                          
        </View>
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'black',        
        borderWidth : 2,
        borderColor : Colors.themeLight,
    },
    touchable : {
        position : 'absolute',
        width: '100%',
        height: '100%'
    },
    discountImage : {
        flexGrow : 1,
        width:'100%',
        height:'100%',        
        backgroundColor: 'black',        
        opacity : 1,
        display : 'flex',
        justifyContent : 'center',
        borderWidth : 2,
        borderColor : Colors.themeLight,
    },
    blackTint : { //container of text
        flexGrow : 1,
        backgroundColor : 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent : 'center',
    },
    discountAvailability: 
    {
        paddingTop : 5,
        paddingRight : 5,
        textAlign : 'right',
        color : 'white',
        fontFamily : 'mohave',
        height : 40
    },
    discountPrice : {
        textAlign : 'center',
        fontSize : 60,
        height : 60,
        fontFamily : 'mohave',    
        color : 'white',
    },
    discountDescription : {
        color : 'white',
        textAlign : 'center',
        height : 20,
        marginTop : 10
    },
    discountClaim : {
        color : 'white',
        textAlign : 'center',
        height : 40,
        marginTop : 20
    },
    redeemed : {
        backgroundColor : 'rgba(0,0,0,0.7)',
        position : "absolute",
        width : '100%',
        height : '100%',
        alignItems : 'center'
        // display : 'flex',
        // justifyContent : 'flex-end'
    },
    redeemedLabel : {
        position : 'absolute',
        bottom : 0,
        margin : 10,
        height : 40,
        paddingLeft : 10,
        paddingRight : 10,
        width : 'auto',
        overflow : 'hidden',
        borderRadius : 5,
        backgroundColor : 'red',
        color : 'white',
        fontFamily : 'mohave',
        textAlign : 'center',
        textAlignVertical : 'center',
        fontSize : 18,
        lineHeight : 40
        
    }
})
