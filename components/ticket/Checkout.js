import React, { Component } from 'react';
import { View, Button } from 'react-native';
var stripe = require('stripe-client')('pk_test_kU9EUtqBnkm5dsjqrphsjzRa');
// import {PaymentsStripe as Stripe} from 'expo-payments-stripe'

// 'pk_live_qhATGjhaSUCT3PYUefZEHb8w'

var information = {
    card: {
      number: '4242424242424242',
      exp_month: '02',
      exp_year: '21',
      cvc: '999',
      name: 'Billy Joe'
    }
  }
  

export default class Checkout extends Component {
  requestPayment = async () => {
    var card = await stripe.createToken(information);
    var token = card.id;
    console.log(token)
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Make a payment"
          onPress={this.requestPayment}
        //   disabled={this.state.isPaymentPending}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};