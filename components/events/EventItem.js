import React, {Component} from 'react';
import {Dimensions,Text,ImageBackground,TouchableOpacity,View, StyleSheet} from 'react-native';
import Colors, { black } from '../../constants/Colors';
import Images from '../../managers/ImagesManager';

export default class EventItem extends Component
{
    constructor(props)
    {
        super(props)        
    }

    render()
    {        
        return <View style={[this.props.style,styles.container]}>
            <TouchableOpacity onPress={this.props.onPress}>
                <ImageBackground style={styles.eventImage} source={this.props.event.image}>
                    <View style={styles.blackTint}>
                        <Text style={styles.eventName}>
                            {this.props.event.name}
                        </Text>
                        <Text style={styles.eventDetail}>
                            {`${this.props.event.date}`}
                        </Text>

                        <Text style={styles.eventDetail}>
                            {`${this.props.event.time}`}
                        </Text>

                        <Text numberOfLines={2} style={[styles.eventDetail, {height: 50}]}>
                            {`${this.props.event.location}`}
                        </Text>

                        <View style={this.props.event.curAvailCount==0? styles.redeemed : {opacity : 0}}>
                            <Text style={styles.redeemedLabel}>
                                FULLY REDEEMED
                            </Text>
                        </View>
                        
                    </View>
                </ImageBackground>
            </TouchableOpacity>
                          
        </View>
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1, 
        display : 'flex',        
        backgroundColor : 'black',        
        borderWidth : 2,
        borderColor : Colors.themeLight,
    },
    touchable : {
        position : 'absolute',
        width: '100%',
        height: '100%'
    },
    eventImage : {
        flexGrow : 1,
        width:'100%',
        height:'100%',        
        backgroundColor: 'black',        
        opacity : 1,
        display : 'flex',
        justifyContent : 'center'
    },
    blackTint : { //container of text
        flexGrow : 1,
        backgroundColor : 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent : 'center',
        alignItems: 'center'
    },
    eventPrice : {
        textAlign : 'center',
        fontSize : 60,
        height : 60,
        fontFamily : 'mohave',    
        color : 'white',
    },
    eventName : {
        color : 'white',
        textAlign : 'center',
        fontFamily : 'avenir-bold',
        fontSize : 45,
        marginTop : 10
    },
    eventDetail : {
        color : 'white',
        textAlign : 'center',
        height : 20,
        width: '70%',
        marginTop : 6
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
        fontSize : 20,
        lineHeight : 40
        
    }
})
