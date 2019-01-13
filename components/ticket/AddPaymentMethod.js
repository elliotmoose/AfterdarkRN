import React, {Component} from 'react'
import {StripeAddCard, AddCard, addCardDefaultStyles} from 'react-native-checkout'
import { ColdObservable } from 'rxjs/testing/ColdObservable';
import Colors from '../../constants/Colors'
var stripe = require('stripe-client')('pk_test_kU9EUtqBnkm5dsjqrphsjzRa');

var information = {
    card: {
      number: '4242424242424242',
      exp_month: '02',
      exp_year: '21',
      cvc: '999',
      name: 'Billy Joe'
    }
}

export default class AddPaymentMethod extends Component
{
    static navigationOptions = {
        headerStyle : {
            backgroundColor : 'black' 
        },
        headerTintColor : Colors.themeLight,
        headerTitle: 'Add Credit Card'
    }

    addPaymentMethod = async (cardNumber, cardExpiry, cardCvc) => {
        console.log(`${cardNumber} ${cardExpiry} ${cardCvc}`)
        var response = await stripe.createToken(information);
        console.log('stripe response:');
        console.log(response)
        var token = response.id;
        console.log(token)
    };

    render()
    {        
        return <AddCard style={[addCardDefaultStyles,{backgroundColor:Colors.themeBackground}]} scanCardVisible={false} addCardButtonText="Add Payment Method" cardNumberPlaceholderText="4242 4242 4242 4242" addCardHandler={(cardNumber, cardExpiry, cardCvc) => {
            this.addPaymentMethod(cardNumber,cardExpiry,cardCvc);
            return Promise.resolve(cardNumber) //return a promise when you're done
          }}></AddCard>
    }
}

// import {PaymentsStripe as Stripe} from 'expo-payments-stripe'

// 'pk_live_qhATGjhaSUCT3PYUefZEHb8w'


  

// export default class Checkout extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Button
//           title="Make a payment"
//           onPress={this.requestPayment}
//         //   disabled={this.state.isPaymentPending}
//         />
//       </View>
//     );
//   }
// }

// const styles = {
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// };



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
