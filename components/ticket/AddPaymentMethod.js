import React, {Component} from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';
import Modal from 'react-native-modal';
import {StripeAddCard, AddCard, addCardDefaultStyles} from 'react-native-checkout';
import { ColdObservable } from 'rxjs/testing/ColdObservable';
import Colors from '../../constants/Colors';
import PaymentsManager from '../../managers/PaymentsManager';
import UserManager from '../../managers/UserManager';
import ActivityModal from '../reusable/ActivityModal';

// var information = {
//     card: {
//       number: '4242424242424242',
//       exp_month: '02',
//       exp_year: '21',
//       cvc: '999',
//       name: 'Billy Joe'
//     }
// }

export default class AddPaymentMethod extends Component
{
    static navigationOptions = {
        headerStyle : {
            backgroundColor : 'black' 
        },
        headerTintColor : Colors.themeLight,
        headerTitle: 'Add Credit Card'
    }

    state = {
        isLoading : false
    }
    _addPaymentMethod = async (cardNumber, cardExpiry, cardCvc) => {
        
        let card = {
            number : cardNumber,
            exp_month : cardExpiry.split('/')[0],
            exp_year : cardExpiry.split('/')[1],
            cvc : cardCvc,
        }

        this.setState({isLoading : true},async ()=>{
            try 
            {
                let response = await PaymentsManager.addPaymentMethod(card);        
                if(response.success === true)
                {                    
                    let stripe_customer_data = response.output;                    
                    UserManager.setStripeCustomer(stripe_customer_data);

                    this.setState({isLoading : false},()=>{
                        this.props.navigation.goBack();
                        let callback = this.props.navigation.getParam('callback');
                        if(callback)
                        {
                            callback();
                        }
                        else
                        {
                            console.log('no callback')
                        }
                    })
                }
                else
                {
                    throw 'The payment method could not be added at this time'
                }
            }
            catch(error)
            {                     
                Alert.alert("Error", error, [
                    { text: "Ok", onPress: () => { 
                            this.setState({isLoading : false})
                        }
                    }    
                  ])         
            }            
        })
    };

    render()
    {       
        addCardDefaultStyles.addButton.backgroundColor = Colors.themeLight
        addCardDefaultStyles.addButtonText.color = 'white'
        addCardDefaultStyles.addButton.borderTopWidth = 0
        addCardDefaultStyles.addButton.borderBottomWidth = 0

            this.refs.AddCar

        return (
        <View style={{flex: 1}}>            
            <AddCard style={[addCardDefaultStyles,{backgroundColor:Colors.themeBackground}]} scanCardVisible={false} addCardButtonText="Add Payment Method" cardNumberPlaceholderText="Card Number" addCardHandler={(cardNumber, cardExpiry, cardCvc) => {
                this._addPaymentMethod(cardNumber,cardExpiry,cardCvc);
                return Promise.resolve(cardNumber) //return a promise when you're done
                }}>
            </AddCard>
{/* 
            <Modal isVisible={this.state.isLoading} style={{alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator style={{width : 40,height:40}}/>
            </Modal> */}

            <ActivityModal isVisible={this.state.isLoading}>

            </ActivityModal>
        </View>
        )
        
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
