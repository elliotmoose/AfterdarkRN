import React, {Component} from 'react'
import {StripeAddCard, AddCard, addCardDefaultStyles} from 'react-native-checkout'

export default class AddPaymentMethod extends Component
{
    render()
    {        
        return <AddCard style={addCardDefaultStyles} scanCardVisible={false} addCardButtonText="Add Payment Method" cardNumberPlaceholderText="4242 4242 4242 4242"></AddCard>
    }
}

// onCardNumberBlur={() => console.log('card number blurred')}
//     onCardNumberFocus={() => console.log('card number focused')}
//     onCvcFocus={() => console.log('cvc focused')}
//     onCvcBlur={() => console.log('cvc blurred')}
//     onExpiryFocus={() => console.log('expiry focused')}
//     onExpiryBlur={() => console.log('expiry blurred')}
//     onScanCardClose={() => console.log('scan card closed')}
//     onScanCardOpen={() => console.log('scan card opened')}
//     activityIndicatorColor="pink"
//     addCardButtonText="Add Card"
//     scanCardButtonText="Scan Card"
//     scanCardAfterScanButtonText="Scan Card Again"
//     scanCardVisible={true}
//     placeholderTextColor="black"
//     cardNumberPlaceholderText="4242 4242 4242 4242"
//     expiryPlaceholderText="MM/YY"
//     cvcPlaceholderText="CVC"
//     cardNumberErrorMessage="Card Number is incorrect"
//     expiryErrorMessage="Expiry is incorrect"
//     cvcErrorMessage="CVC is incorrect"
//     scanCardContainer={/*Custom component*/}
