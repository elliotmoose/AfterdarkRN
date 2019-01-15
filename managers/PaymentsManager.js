const NetworkManager = require('./NetworkManager');
const UserManager = require('./UserManager');

const stripe = require('stripe-client')('pk_test_kU9EUtqBnkm5dsjqrphsjzRa');

module.exports.paymentMethods = []
module.exports.selectedPaymentMethodIndex = 0

var information = {
    card: {
      number: '4242424242424242',
      exp_month: '02',
      exp_year: '21',
      cvc: '999',
      name: 'Billy Joe'
    }
}

module.exports.addPaymentMethod = async (card) =>
{
    try 
    {
        var response = await stripe.createToken({card : card});
        let token = response.id;
        let user_id = UserManager.getUserId();    
    
        let url = `${NetworkManager.domain}/AddPaymentMethod`;
        let body = {
            token: token,
            user_id : user_id
        }
    
        let apiResponse = await NetworkManager.JsonRequest('POST', body, url)
        
        if(apiResponse.success)
        {
            UserManager.setStripeCustomer(apiResponse.output);
        }
        
        return apiResponse;
    }
    catch(error)
    {
        console.log(error)
        throw 'Could not connect to server'
    }
}

module.exports.removePaymentMethod = async (card_id)=>{
    try 
    {
        let user_id = UserManager.getUserId();    
    
        let url = `${NetworkManager.domain}/RemovePaymentMethod`;
        let body = {
            card_id: card_id,
            user_id : user_id
        }
    
        let apiResponse = await NetworkManager.JsonRequest('POST', body, url)

        if(apiResponse.success)
        {
            UserManager.setStripeCustomer(apiResponse.output);
        }
        
        return apiResponse;
    }
    catch(error)
    {
        console.log(error)
        throw 'Could not connect to server'
    }
}

module.exports.purchase = async (ticket) =>
{
    // var response = await stripe.createToken({card : });
    // var token = response.id;
    // console.log(token)
}

module.exports.paymentMethods = ()=>
{
    if(UserManager.stripe_customer != null && UserManager.stripe_customer.sources && UserManager.stripe_customer.sources.data)
    {
        return UserManager.stripe_customer.sources.data;
    }
    else
    {
        return []
    }
}


//      Object {
//        "card": Object {
//          "address_city": null,
//          "address_country": null,
//          "address_line1": null,
//          "address_line1_check": null,
//          "address_line2": null,
//          "address_state": null,
//          "address_zip": null,
//          "address_zip_check": null,
//          "brand": "Visa",
//          "country": "US",
//          "cvc_check": "unchecked",
//          "dynamic_last4": null,
//          "exp_month": 2,
//          "exp_year": 2021,
//          "funding": "credit",
//          "id": "card_1DsM6eDgO1v7Dg9QNDxhlu1n",
//          "last4": "4242",
//          "metadata": Object {},
//          "name": null,
//          "object": "card",
//          "tokenization_method": null,
//        },
//        "client_ip": "103.24.77.51",
//        "created": 1547436440,
//        "id": "tok_1DsM6eDgO1v7Dg9Q7gJJWxaM",
//        "livemode": false,
//        "object": "token",
//        "type": "card",
//        "used": false,
//      }